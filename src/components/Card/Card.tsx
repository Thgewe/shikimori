import React, {FC} from 'react';
import cl from './card.module.css';
import {API_IMAGE_URL} from "../../utils/constants";
import {Link} from "react-router-dom";
import {whatKind} from "../../utils/kind";

interface CardProps {
    id: number,
    title: string,
    kind: string,
    aired_on: string,
    image: string,
    path: string,
}

const Card: FC<CardProps> = ({
                                 id,
                                 title,
                                 kind,
                                 aired_on,
                                 image,
                                 path,
}) => {
    return (
        <Link to={path + id} className={cl.card} title={title}>
            <div className={cl.image_wrapper}>
                <img src={API_IMAGE_URL + image} alt={title} className={cl.image}/>
            </div>
            <div className={cl.title}>{title}</div>
            <div className={cl.bottom}>
                <div className={cl.kind}>{whatKind(kind)}</div>
                <div className={cl.year}>{new Date(aired_on).getFullYear()}</div>
            </div>
        </Link>
    );
};

export default Card;