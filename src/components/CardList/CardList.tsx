import React, {FC, memo, SetStateAction, useEffect, useRef, useState} from 'react';
import cl from './cardList.module.css';
import Card from "../Card/Card";
import {IShortAnime, IShortManga, IShortRanobe} from "../../models/IShikimoriApi";
import {debounce} from "../../utils/debounce";


interface CardListProps {
    items: IShortAnime[] | IShortManga[] | IShortRanobe[],
    type: 'animes' | 'mangas' | 'ranobe'
    changePage: Function,
    loading: boolean
}

const CardList: FC<CardListProps> = memo(({items, type, loading, changePage}) => {

    const list = useRef<HTMLDivElement>(null)
    const scrollHandler = debounce(() => {
        if (list.current!.clientHeight
            - document.documentElement.clientHeight
            - document.documentElement.scrollTop
            < document.documentElement.clientHeight + 100 && !loading) {
            changePage(1)
        }
    }, 1200)

    const removeListener = () => {
        window.removeEventListener('scroll', scrollHandler)
    }
    useEffect(() => {

        window.addEventListener('scroll', scrollHandler)
        return () => {
            removeListener()
        }
    }, [])

    return (
        <div className={cl.cards} ref={list}>
            {items?.map((item) =>
                <Card
                    key={item.id}
                    id={item.id}
                    title={item.russian ? item.russian : item.name}
                    kind={item.kind}
                    aired_on={item.aired_on}
                    image={item.image.preview}
                    path={'/' + type + '/'}
                />
            )}
        </div>
    );
});

export default CardList;