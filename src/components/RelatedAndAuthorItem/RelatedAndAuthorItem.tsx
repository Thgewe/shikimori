import React, {FC} from 'react';
import cl from './relatedItemAndAuthor.module.css';
import {API_IMAGE_URL} from "../../utils/constants";
import {getDate} from "../../utils/getDate";
import {TShikimoriKindOfProduct} from "../../models/ShikimoriTypes";
import {whatKind} from "../../utils/kind";
import {Link} from "react-router-dom";

interface IRelatedProps {
    id: number,
    name: string,
    kind?: TShikimoriKindOfProduct,
    relation_ru?: string,
    image: string,
    aired_on?: string | null,
    roles?: string[],
    hidden: boolean,
    category: 'animes' | 'mangas' | 'ranobe',
    showAll: boolean,
}

const RelatedAndAuthorItem: FC<IRelatedProps> = ({
                                                     id,
                                                     name,
                                                     kind,
                                                     relation_ru,
                                                     image,
                                                     roles,
                                                     hidden,
                                                     aired_on,
                                                     category,
                                                     showAll,
}) => {
    return (
        <div className={hidden
            ? showAll
                ? cl.item
                : cl.item + ' ' + cl.hidden
            : cl.item
        }>
            <div className={cl.image}>
                <img src={API_IMAGE_URL + image} alt={name}/>
            </div>
            <div className={cl.info}>
                <Link className={cl.name} to={'/' + category + '/' + id}>{name}</Link>
                {kind ? <div className={cl.caption}>{whatKind(kind)}</div> : null}
                {aired_on ? <div className={cl.caption}>{getDate(aired_on, true)}</div> : null}
                {relation_ru ? <div className={cl.caption + ' ' + cl.relation}>{relation_ru}</div> : null}
                {roles ? roles.map((role) =>
                    <div key={role} className={cl.caption}>{role}</div>) : null}
            </div>
        </div>
    );
};

export default RelatedAndAuthorItem;