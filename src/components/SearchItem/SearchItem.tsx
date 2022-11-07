import React, {FC, useEffect, useState} from 'react';
import cl from './searchItem.module.css';
import {API_IMAGE_URL} from "../../utils/constants";
import {Link} from "react-router-dom";

interface SearchItemProps {
    id: number,
    name: string,
    russian?: string,
    image: string,
    url: string,
    kind?: string,
    score?: string,
    status?: string,
    aired_on?: string,
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

    const [path, setPath] = useState<string>('')

    useEffect(() => {
        if (category)
            setPath('/' + category + '/' + id)
    }, [category])

    return (
        <Link to={path} className={cl.item}>
            <img src={API_IMAGE_URL + image} alt={name}/>
            <div className={cl.info}>
                <div className={cl.title}>{russian ? name +  ' / ' + russian : name}</div>
                <div className={cl.topics}>
                    <div className={cl.topic}>{kind}</div>
                    <div className={cl.topic}>{aired_on}</div>
                    {episodes
                        ? <div className={cl.topic}>{'episodes: ' + episodes}</div>
                        : (volumes
                            ? <div className={cl.topic}>{'volumes: ' + volumes}</div>
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