import React, {FC, useEffect, useState} from 'react';
import cl from './newsByIdPage.module.css';
import {Link, useParams} from "react-router-dom";
import ShikimoriApi from "../../API/ShikimoriApi";
import {useFetch} from "../../hooks/useFetch";
import {IComments, ITopicNews} from "../../models/IShikimoriApi";
import Loader from "../../components/Loader/Loader";
import Topic from "../../components/Topic/Topic";
import {getTimeSpan, timePassed} from "../../utils/time";
import Slider from "../../components/Slider/Slider";
import Comments from "../../components/Comments/Comments";
import PageHeadline from "../../components/PageHeadline/PageHeadline";

// TODO: fullscreen slider

const NewsByIdPage: FC = () => {

    const params = useParams();
    const shiki = ShikimoriApi
    const [news, setNews] = useState<ITopicNews>()
    const [comments, setComments] = useState<IComments[]>([])

    const [fetching, loading, error] = useFetch(async () => {
        const res = await shiki.getNewsById(+params.id!);
        const comm = await shiki.getCommentsByIdAndTopic(+params.id!)

        setComments(comm.sort((a, b) =>
                new Date(a.created_at) >= new Date(b.created_at) ? 1 : -1
            )
        )
        setNews(res)
    })

    useEffect(() => {
        fetching()
    }, [])

    const formatText = () => {
        let str: string = '';
        if (news) str = news.html_body
        let newStr = str.replace(/(?<=class=")bubbled b-link"/g, 'default-link"')
        newStr = newStr.replace(/(?<=class=")quote-content"/g, cl.quote + '"')
        newStr = newStr.replace(/(?<=class=")b-link"/g, 'default-link"')
        newStr = newStr.replace(/class="name-en"/g, 'class=' + cl.nameEn)
        newStr = newStr.replace(
            /(?<=class=")c-video b-video unprocessed youtube {2}fixed"/g,
            cl.video + ' ' + cl.youtube + '"'
        )
        newStr = newStr.replace(/https:\/\/shikimori.one/g, '')
        return newStr
    }

    if (error) return <div>{error}</div>
    if (loading) return <Loader />
    return (
        <div className={cl.page}>
            <PageHeadline titleRu={news?.topic_title ? news.topic_title : ''} />
            <div className={cl.author}>
                <div className={cl.avatar}>
                    <img className={cl.image} src={news?.user.avatar} alt="user avatar"/>
                </div>
                <div className={cl.info}>
                    <Topic text={'новость'} type={'news'}/>
                    <div className={cl.nickname}><span>{news?.user.nickname}</span> {' о ' + news?.linked?.name}</div>
                    <div className={cl.bottom}>
                        <div className={cl.commentsCounter}>{news?.comments_count}</div>
                        {/*<time className={cl.time} dateTime={news?.created_at}>{timeFunc()}</time>*/}
                        <time className={cl.time} dateTime={news?.created_at}>{timePassed(getTimeSpan(news?.created_at))}</time>
                    </div>
                </div>
            </div>
            <div className={cl.text} dangerouslySetInnerHTML={{__html: formatText()}}></div>
            <Slider>
                {news?.html_footer.match(/(?<=src=").*?(?=")/g)!.map((src) => <img src={src} alt={'kartinka'} key={src}/>)}
            </Slider>
            <Comments comments={comments}/>
        </div>
    );
};

export default NewsByIdPage;