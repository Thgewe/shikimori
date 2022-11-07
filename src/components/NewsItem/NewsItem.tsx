import React, {FC} from 'react';
import cl from './newsItem.module.css';
import {IShortAnime, IShortCharacter, IShortManga, IShortRanobe} from "../../models/IShikimoriApi";
import {Link} from "react-router-dom";
import Topic from "../Topic/Topic";

interface NewsItemProps {
    id: number,
    title: string,
    body: string,
    html_footer: string,
    linked_id: number | null,
    linked_type: string,
    linked: IShortAnime | IShortManga | IShortRanobe | IShortCharacter | null,
}

const NewsItem: FC<NewsItemProps> = ({
    id,
    title,
    body,
    html_footer,
    linked_id,
    linked_type,
    linked,
}) => {


    const src = html_footer.match(/(?<=src=").*?(?=")/)
        ? html_footer.match(/(?<=src=").*?(?=")/)![0]
        : null

    const topics = [
        linked_type === 'Anime'
            ? 'аниме'
            : linked_type === 'Manga'
                ? 'манга'
                : linked_type === 'Ranobe'
                    ? 'ранобэ'
                    : 'аниме'
    ]

    // creates topics if the text contains certain words
    const checkTitle = (...args: string[]) => {
        args.forEach((str) => {
            if (title.toLowerCase().includes(str)) {
                topics.push(str)
            }
        })
    }

    if (!linked) {
        topics.push('анонс')
    }
    checkTitle(
        'трейлер',
        'опенинг',
        'эндинг',
        'сейю',
        'клип',
        'музыка',
        'постер',
        'подробности',
        'перерыв',
        'персонажи',
        'перенос',
    )

    return (
        <Link className={cl.item} to={'/news/' + id}>
            {src
                ? <div key={src} className={cl.imageContainer}>
                    <img className={cl.image} src={src} alt={title}/>
                </div>
                : <div className={cl.noImage + ' ' + cl.imageContainer}><div>NO IMAGE</div></div>
            }
            <div className={cl.topics}>
                {topics.map((str) => <Topic key={str} text={str} />)}
            </div>
            <div className={cl.title}>{title}</div>
        </Link>
    );
};

export default NewsItem;
