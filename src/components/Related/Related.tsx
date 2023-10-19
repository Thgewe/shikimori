import React, {FC, useEffect, useState} from 'react';
import cl from './related.module.css';
import {IRelated} from "../../models/IShikimoriApi";
import ShikimoriApi from "../../API/ShikimoriApi";
import {useFetch} from "../../hooks/useFetch";
import Loader from "../Loader/Loader";
import RelatedAndAuthorItem from "../RelatedAndAuthorItem/RelatedAndAuthorItem";
import BlockName from "../BlockName/BlockName";

interface IRelatedProps {
    id: number,
    category: 'animes' | 'mangas' | 'ranobe',
}

const Related: FC<IRelatedProps> = ({id, category}) => {

    const shiki = ShikimoriApi;
    const [related, setRelated] = useState<IRelated[]>([])
    const [showAll, setShowAll] = useState<boolean>(false)

    const maxItems = 7;

    const [fetching, loading, error] = useFetch(async () => {
        const res = await shiki.getRelatedById(id, category)
        setRelated(res)
    });

    useEffect(() => {
        fetching()
    }, [])

    if (loading) return <div className={cl.list}>
        <BlockName type={'default'} text={'СВЯЗАННОЕ'} />
        <Loader />
    </div>
    else if (error) return <div>{error}</div>
    return (
        <div className={cl.list}>
            <BlockName type={'default'} text={'СВЯЗАННОЕ'} />
            {related.map((item, i) => item.anime
                ? <RelatedAndAuthorItem
                    key={item.anime.id}
                    id={item.anime.id}
                    name={item.anime.russian ? item.anime.russian : item.anime.name}
                    image={item.anime.image.preview}
                    aired_on={item.anime.aired_on}
                    relation_ru={item.relation_russian}
                    kind={item.anime.kind}
                    category={"animes"}
                    hidden={i >= maxItems}
                    showAll={showAll}
                />
                : <RelatedAndAuthorItem
                    key={item.manga.id}
                    id={item.manga.id}
                    name={item.manga.russian ? item.manga.russian : item.manga.name}
                    image={item.manga.image.preview}
                    aired_on={item.manga.aired_on}
                    relation_ru={item.relation_russian}
                    kind={item.manga.kind}
                    category={item.manga.kind === "manga" ? 'mangas' : 'ranobe'}
                    hidden={i >= maxItems}
                    showAll={showAll}
                />
            )}
            {showAll
                ? null
                : related.length - maxItems > 0
                    ? <div
                        className={cl.show}
                        onClick={() => setShowAll(true)}
                    >
                        + показать остальное ({related.length - maxItems})
                    </div>
                    : null
            }
        </div>
    );
};

export default Related;