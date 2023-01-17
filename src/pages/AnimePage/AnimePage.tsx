import React, {FC, useEffect, useState} from 'react';
import cl from './animePage.module.css';
import {useParams} from "react-router-dom";
import PageHeadline from "../../components/PageHeadline/PageHeadline";
import Information from "../../components/Information/Information";
import ShikimoriApi from "../../API/ShikimoriApi";
import {useFetch} from "../../hooks/useFetch";
import {IAnime, IComments, IRoles} from "../../models/IShikimoriApi";
import Loader from "../../components/Loader/Loader";
import Description from "../../components/Description/Description";
import Studio from "../../components/Studio/Studio";
import {API_IMAGE_URL} from "../../utils/constants";
import SlideMenuMobile from "../../components/SlideMenuMobile/SlideMenuMobile";
import RatesDiagram from "../../components/RatesDiagram/RatesDiagram";
import Related from "../../components/Related/Related";
import Authors from "../../components/Authors/Authors";
import PlainCardGrid, {IPlainCard} from "../../components/PlainCardGrid/PlainCardGrid";
import Comments from "../../components/Comments/Comments";

type TAnimeParams = {
    id: string;
}

const AnimePage: FC = () => {

    const params = useParams<TAnimeParams>()
    const shiki = ShikimoriApi

    const [anime, setAnime] = useState<IAnime>({
        kind: "tv",
        name: '',
        russian: '',
        id: 1,
        image: {
            preview: '',
            x48: '',
            x96: '',
            original: '',
        },
        studios: [],
        aired_on: '',
        status: '',
        rating: '',
        score: '',
        anons: false,
        description: '',
        description_html: '',
        description_source: null,
        duration: 1,
        english: [],
        episodes: 1,
        episodes_aired: 1,
        favoured: false,
        genres: [],
        franchise: '',
        japanese: [],
        licensors: [],
        license_name_ru: '',
        myanimelist_id: 1,
        next_episode_at: null,
        ongoing: false,
        rates_scores_stats: [],
        rates_statuses_stats: [],
        released_on: null,
        url: '',
        screenshots: [],
        synonyms: [],
        thread_id: 1,
        topic_id: 1,
        updated_at: '',
        user_rate: null,
        videos: [],
    });
    const [roles, setRoles] = useState<IRoles[]>([])
    const [comments, setComments] = useState<IComments[]>([])

    const [fetching, loading, error] = useFetch(async () => {
        const res = await shiki.getAnimeById(+params.id!);
        setAnime(res);
    })
    const [fetchingRoles, loadingRoles, errorRoles] = useFetch(async() => {
        const res = await shiki.getRolesById(+params.id!, 'animes')
        setRoles(res)
    })
    const [fetchingComments, loadingComments, errorComments] =
        useFetch(async (id: number) => {
            const res = await shiki.getCommentsByIdAndTopic(id)
            setComments(res.sort((a, b) =>
                new Date(a.created_at) >= new Date(b.created_at) ? 1 : -1
            ))
        })

    useEffect(() => {
        fetching();
        fetchingRoles();
    }, [params.id])
    useEffect(() => {
        if (anime.topic_id !== 1)
            fetchingComments(anime.topic_id)
    }, [anime])

    // TODO: - error component
    //       - similar
    //       - screenshots
    //       - authors page
    //       - anime character page

    if (loading) return <Loader />
    if (!anime.name) return <></>

    return (
        <div className={cl.page}>
            <PageHeadline
                titleRu={anime.russian}
                titleEn={anime.name}
            />
            <SlideMenuMobile
                leftElements={
                    <>
                        <div className={cl.main}>
                            <div className={cl.mainImage}>
                                <img src={API_IMAGE_URL + anime.image.original} alt={anime.name}/>
                            </div>
                            <Information
                                key={anime.id}
                                kind={anime.kind}
                                status={anime.status}
                                duration={anime.duration}
                                episodes={anime.episodes_aired}
                                genres={anime.genres}
                                rating={anime.rating}
                                licensors={anime.licensors}
                                license_name_ru={anime.license_name_ru}
                                japanese={anime.japanese}
                                english={anime.english}
                                synonyms={anime.synonyms}
                                aired_on={anime.aired_on}
                                next_episode_at={anime.next_episode_at}
                            />
                            <Studio studios={anime.studios} />
                            <div className={cl.descr}>
                                <Description description={anime.description} />
                            </div>
                        </div>
                        <div className={cl.second}>
                            <Related id={+params.id!} category={'animes'} />
                            <Authors
                                category={'animes'}
                                loading={loadingRoles}
                                error={errorRoles}
                                authors={roles.reduce(
                                    (acc, role) =>
                                        role.roles.includes("Original Creator")
                                            ? [...acc, role]
                                            : role.roles.includes("Director")
                                                ? [...acc, role]
                                                : role.roles.includes("Story \u0026 Art")
                                                    ? [...acc, role]
                                                    : acc,
                                    [] as IRoles[]
                                )}
                            />
                        </div>
                        {!errorRoles ? <PlainCardGrid
                            loading={loadingRoles}
                            blockName={'ГЛАВНЫЕ ГЕРОИ'}
                            category={'characters'}
                            items={roles.reduce(
                                (acc, role) =>
                                    role.roles.includes('Main')
                                        ? [...acc, {
                                            id: role.character!.id,
                                            name: role.character!.russian,
                                            image: role.character!.image.preview,
                                        }]
                                        : acc,
                                [] as IPlainCard[]
                            )}
                        /> : <div>{errorRoles}</div>}
                        {loadingComments
                            ? <Loader />
                            : errorComments
                                ? <div>{errorComments}</div>
                                : <Comments comments={comments} />
                        }
                    </>
                }
                rightElements={
                    <>
                        <RatesDiagram rates={anime.rates_scores_stats} name={'ОЦЕНКИ ЛЮДЕЙ'}/>
                        <RatesDiagram rates={anime.rates_statuses_stats} name={'В СПИСКАХ У ЛЮДЕЙ'}/>
                    </>
                }
            />
        </div>
    );
};

export default AnimePage;