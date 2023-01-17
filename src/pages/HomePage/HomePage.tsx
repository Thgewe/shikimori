import React, {FC, useEffect, useMemo, useRef, useState} from 'react';
import cl from './homePage.module.css';
import News from "../../components/News/News";
import {IShortAnime, ITopicNews} from "../../models/IShikimoriApi";
import ShikimoriApi from "../../API/ShikimoriApi";
import {useFetch} from "../../hooks/useFetch";
import Loader from "../../components/Loader/Loader";
import BlockName from "../../components/BlockName/BlockName";
import CardSlider from "../../components/CardSlider/CardSlider";
import shuffleAndSliceArray from "../../utils/shuffleAndSliceArray";
import {IListOfNewsParams} from "../../models/IShikimoriApiParams";
import {debounce} from "../../utils/debounce";

const HomePage: FC = () => {

    const [news, setNews] = useState<ITopicNews[]>([]);
    const [animes, setAnimes] = useState<IShortAnime[]>([]);
    const newsParams = useRef<IListOfNewsParams>({
        page: 1,
        limit: 9,
    })
    const page = useRef<HTMLDivElement>(null)
    const shiki = ShikimoriApi

    const [fetchAnimes, loadingAnimes, errorAnimes] = useFetch(async () => {
        const animeRes = await shiki.getListOfAnime({
            page: 1,
            limit: 30,
            order: 'popularity',
            kind: 'tv',
            status: 'ongoing',
        })
        setAnimes(animeRes)
    })
    const [fetchNews, loadingNews, errorNews] = useFetch(async () => {
        const newsRes = await shiki.getListOfNews(newsParams.current);
        // The API returns "limit + 1" items if there are pages left.
        // This block gets rid of the extra item
        // (now for some reason this does not work for a non-news request)
        if (newsRes.length > newsParams.current.limit - 1)
            newsRes.pop()
        newsParams.current.page === 1 ? setNews(newsRes) : setNews(prevState => [...prevState, ...newsRes])
    })

    const changePage = (add: number) => {
        newsParams.current.page = newsParams.current.page + add
        fetchNews()
    }
    const scrollHandler = debounce(() => {
        if (page.current!.clientHeight
            - document.documentElement.clientHeight
            - document.documentElement.scrollTop
            < document.documentElement.clientHeight + 100 && !loadingNews) {
            console.log(newsParams.current.page)
            changePage(1)
        }
    }, 1200)
    useEffect(() => {
        fetchAnimes()
        fetchNews()
        window.addEventListener('scroll', scrollHandler)
        return () => {
            window.removeEventListener('scroll', scrollHandler)
        }
    }, [])

    const shuffledAnimes = useMemo(() => shuffleAndSliceArray(animes, 15), [animes])

    if (errorAnimes || errorNews) alert(errorAnimes + '\n' + errorNews)
    if (loadingAnimes) return <Loader />

    return (
        <section className={cl.news} ref={page}>
            <div className={cl.onTheScreens}>
                <BlockName type={'onTheScreens'} />
                <CardSlider cards={shuffledAnimes}/>
            </div>
            <div className={cl.newNews}>
                <News
                    newsList={news}
                    type={'new'}
                />
                {
                    loadingNews ? <Loader /> : null
                }
            </div>
        </section>
    );
};

export default HomePage;