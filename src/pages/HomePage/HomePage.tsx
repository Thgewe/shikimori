import React, {FC, useEffect, useState} from 'react';
import cl from './homePage.module.css';
import News from "../../components/News/News";
import {IShortAnime, ITopicNews} from "../../models/IShikimoriApi";
import ShikimoriApi from "../../API/ShikimoriApi";
import {useFetch} from "../../hooks/useFetch";
import Loader from "../../components/Loader/Loader";
import BlockName from "../../components/BlockName/BlockName";
import CardSlider from "../../components/CardSlider/CardSlider";

const HomePage: FC = () => {

    const [news, setNews] = useState<ITopicNews[]>([]);
    const [animes, setAnimes] = useState<IShortAnime[]>([]);
    const shiki = ShikimoriApi

    const [fetching, loading, error] = useFetch(async () => {
        const newsRes = await shiki.getListOfNews();
        const animeRes = await shiki.getListOfAnime({
            page: 1,
            limit: 30,
            order: 'popularity',
            kind: 'tv',
            status: 'ongoing',
        })
        setAnimes(animeRes)
        setNews(newsRes);
    })

    useEffect(() => {
        fetching()
    }, [])

    const shuffleAndSliceArray = (array: IShortAnime[], limit: number) => {
        if (array.length < limit) return array
        const newArray: IShortAnime[] = []
        const shuffled = array.sort(() => Math.random() - 0.5);
        for (let i = 0; i < limit; i++) {
            newArray.push(shuffled[i])
        }
        return newArray
    }

    if (error) return <div>{error}</div>
    if (loading) return <Loader />

    return (
        <div>
            <section className={cl.news}>
                <div className={cl.onTheScreens}>
                    <BlockName type={'onTheScreens'} />
                    <CardSlider cards={shuffleAndSliceArray(animes, 15)}/>
                </div>
                <div className={cl.newNews}>
                    <News
                        newsList={news}
                        type={'new'}
                    />
                </div>
            </section>
        </div>
    );
};

export default HomePage;