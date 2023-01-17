import React, {FC, SetStateAction, useCallback, useEffect, useRef, useState} from 'react';
import {IShortAnime, IShortManga, IShortRanobe} from "../../models/IShikimoriApi";
import ShikimoriApi from "../../API/ShikimoriApi";
import {useFetch} from "../../hooks/useFetch";
import {IFilterParams} from "../../models/IFilterParams";
import cl from './commonListPage.module.css';
import CardList from "../../components/CardList/CardList";
import Filter from "../../components/Filter/Filter";

interface CommonListPageProps {
    type: 'animes' | 'mangas' | 'ranobe',
}

const CommonListPage: FC<CommonListPageProps> = ({type}) => {

    const [all, setAll] = useState<IShortAnime[] | IShortManga[] | IShortRanobe[]>([])
    const filterMenu = useRef<HTMLDivElement>(null)
    const parameters = useRef<IFilterParams>({
        page: 1,
        limit: 20,
        order: 'ranked',
        season: '',
        genre: '',
        score: '',
        kind: '',
        status: '',
        rating: '',
    })

    const shiki = ShikimoriApi

    const [fetching, loading, error] = useFetch(async () => {
        switch (type) {
            case "animes":
                const animeRes = await shiki.getListOfAnime(parameters.current)
                if (animeRes.length > parameters.current.limit - 1)
                    animeRes.pop()
                parameters.current.page === 1 ? setAll(animeRes) : setAll((prevState) => [...prevState as IShortAnime[], ...animeRes])
                break;
            case "mangas":
                const mangaRes = await shiki.getListOfManga(parameters.current)
                if (mangaRes.length > parameters.current.limit - 1)
                    mangaRes.pop()
                parameters.current.page === 1 ? setAll(mangaRes) : setAll(prevState => [...prevState as IShortManga[], ...mangaRes])
                break;
            case "ranobe":
                const ranobeRes = await shiki.getListOfRanobe(parameters.current)
                if (ranobeRes.length > parameters.current.limit - 1)
                    ranobeRes.pop()
                parameters.current.page === 1 ? setAll(ranobeRes) : setAll(prevState => [...prevState as IShortRanobe[], ...ranobeRes])
                break;
        }
    })

    const changeSettings = useCallback((filter: IFilterParams) => {
        parameters.current = {
            page: 1,
            limit: 20,
            order: filter.order,
            season: filter.season,
            genre: filter.genre,
            score: filter.score,
            kind: filter.kind,
            status: filter.status,
            rating: filter.rating,
        }
        fetching()
    }, [])
    const changePage = (add: number) => {
        parameters.current.page = parameters.current.page + add
        fetching()
    }

    useEffect(() => {
        fetching()
    }, [])

    const toggleFilterMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.classList.toggle(cl.active)
        filterMenu.current!.classList.toggle(cl.filterOn)
    }

    if (error) return <div>{error}</div>
    return (
        <div className={cl.page}>
            <div className={cl.descr}>
                <h1>{type === 'animes' ? 'Аниме' : type === 'mangas' ? 'Манга' : 'Ранобэ'}</h1>
                <p>
                    На этой странице отображен список {type === 'animes' ? 'аниме' : type === 'mangas' ? 'манги' : 'ранобэ'}.<br/>
                    Используйте фильтры для поиска подходящего вам или воспользуйтесь поиском.
                </p>
                <div className={cl.filterButton} onClick={toggleFilterMenu}>
                    меню
                </div>
            </div>
            <div className={cl.track} ref={filterMenu}>
                <section className={cl.list}>
                    <CardList
                        items={all}
                        type={type}
                        changePage={changePage}
                        loading={loading}
                    />
                </section>
                <aside className={cl.filter}>
                    <Filter
                        changeFilter={changeSettings}
                        filter={parameters.current}
                        type={type}
                    />
                </aside>
            </div>
        </div>
    );
};


export default CommonListPage;