import React, {FC} from 'react';
import cl from './news.module.css';
import NewsItem from "../NewsItem/NewsItem";
import {ITopicNews} from "../../models/IShikimoriApi";

interface NewsProps {
    newsList: ITopicNews[],
    type: 'new' | 'all',
}

const News: FC<NewsProps> = ({newsList, type}) => {
    return (
        <div className={cl.news}>
            <h2
                className={type === 'new' ? cl.heading : cl.heading + ' ' + cl.all}
            >
                {type === 'new' ? 'НОВОСТИ' : 'ЕЩЕ НОВОСТИ'}
            </h2>
            <div className={cl.list}>
                {newsList.map((news) =>
                    <NewsItem
                        key={news.id}
                        id={news.id}
                        title={news.topic_title}
                        body={news.body}
                        html_footer={news.html_footer}
                        linked_id={news.linked_id}
                        linked_type={news.linked_type}
                        linked={news.linked}
                    />
                )}
            </div>
        </div>
    );
};

export default News;