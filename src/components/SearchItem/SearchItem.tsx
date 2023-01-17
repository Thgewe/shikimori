import React, {FC, useEffect, useState} from 'react';
import cl from './searchItem.module.css';
import {API_IMAGE_URL} from "../../utils/constants";
import {Link} from "react-router-dom";
import {whatKind} from "../../utils/kind";
import {TShikimoriKindOfProduct} from "../../models/ShikimoriTypes";
import {getDate} from "../../utils/getDate";

interface SearchItemProps {
    id: number,
    name: string,
    russian?: string,
    image: string,
    url: string,
    kind?: TShikimoriKindOfProduct,
    score?: string,
    status?: string,
    aired_on?: string | null,
    episodes?: number,
    volumes?: number,
    category: string,
}

const SearchItem: FC<SearchItemProps> = ({
                                             id,
                                             name,
                                             russian,
                                             image,
                                             kind,
                                             aired_on,
                                             status,
                                             episodes,
                                             volumes,
                                             category,
}) => {

    // const [path, setPath] = useState<string>('')
    //
    // useEffect(() => {
    //     if (category)
    //         setPath('/' + category + '/' + id)
    // }, [category])

    return (
        // <Link to={path} className={cl.item}>
        <Link to={'/' + category + '/' + id} className={cl.item}>
            <img src={API_IMAGE_URL + image} alt={name}/>
            <div className={cl.info}>
                <div className={cl.title}>{russian ? name +  ' / ' + russian : name}</div>
                <div className={cl.topics}>
                    {kind ? <div className={cl.topic}>{whatKind(kind)}</div> : null}
                    {aired_on ? <div className={cl.topic}>{getDate(aired_on, true)}</div> : null}
                    {episodes
                        ? <div className={cl.topic}>{'Эпизодов: ' + episodes}</div>
                        : (volumes
                            ? <div className={cl.topic}>{'Томов: ' + volumes}</div>
                            : null)
                    }
                    {status ? <div
                        className={
                            cl.topic + ' ' + cl.status + ' ' + (status === 'anons'
                                ? cl.anons
                                : status === 'ongoing'
                                    ? cl.ongoing
                                    : '')
                        }
                    >
                        {status}
                    </div> : null}
                </div>
            </div>
        </Link>
    );
};

export default SearchItem;