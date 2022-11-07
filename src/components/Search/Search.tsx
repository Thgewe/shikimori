import React, {FC, useEffect, useState} from 'react';
import cl from './search.module.css';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {shadeSlice} from "../../store/reducers/ShadeSlice";
import ShikimoriApi from "../../API/ShikimoriApi";
import {useFetch} from "../../hooks/useFetch";
import {IShortAnime, IShortCharacter, IShortManga, IShortRanobe} from "../../models/IShikimoriApi";
import SearchItem from "../SearchItem/SearchItem";
import Loader from "../Loader/Loader";

enum categoryEnum {
    anime = 'animes',
    manga = 'mangas',
    ranobe = 'ranobe',
    character = 'characters',
    // person = 'person',
}

interface SearchProps {
    headerClass: string,
    setHeaderClass: React.Dispatch<React.SetStateAction<string>>
    headerClassWithPanel: string,
    currentHeaderClass: string,
}

const Search: FC<SearchProps> = ({
                                     currentHeaderClass,
                                     headerClass,
                                     setHeaderClass,
                                     headerClassWithPanel
}) => {


    const [value, setValue] = useState<string>('');
    const [searching, setSearching] = useState<boolean>(false);
    const [activeCat, setActiveCat] = useState<string>('animes');
    const [searchClass, setSearchClass] = useState<string>(cl.search)
    const [searchItems, setSearchItems] = useState<
            IShortAnime[] | IShortManga[] | IShortRanobe[] | IShortCharacter[]
        >([]);
    const shade = useAppSelector(state => state.shadeReducer)
    const {hideShade, showShade} = shadeSlice.actions
    const dispatch = useAppDispatch()
    const shiki = ShikimoriApi
    const [fetching, loading, error] = useFetch(async () => {
        switch(activeCat) {
            case categoryEnum.anime:
                setSearchItems(await shiki.getListOfAnimeByName(value))
                break;
            case categoryEnum.manga:
                setSearchItems(await shiki.getListOfMangaByName(value))
                break;
            case categoryEnum.ranobe:
                setSearchItems(await shiki.getListOfRanobeByName(value))
                break;
            case categoryEnum.character:
                setSearchItems(await shiki.getListOfCharactersByName(value))
                break;
            // case categoryEnum.person:
            //     setSearchItems(await shiki.getListOfAnimeByName(value))
            //     break;
            default:
                setSearchItems(await shiki.getListOfAnimeByName(value))
        }
    });

    useEffect(() => {
        const delay = setTimeout(() => {
            fetching()
            setSearching(true)
        }, 200)
        if (!value) {
            clearTimeout(delay)
            setSearching(false)
        }
        return () => {
            clearTimeout(delay)
        }
    }, [value])

    useEffect(() => {
        if (!shade.isActive) {
            setSearchClass(cl.search)
            setValue('')
        }
        if (shade.type === 'drop') {
            setSearchClass(cl.search)
            setValue('')
        }
        if (currentHeaderClass === headerClassWithPanel) {
            setSearchClass(cl.search + ' ' + cl.active)
        } else if (currentHeaderClass !== headerClassWithPanel) {
            setSearchClass(cl.search)
        }
    }, [shade, currentHeaderClass])

    const categories = [
        {
            name: 'animes',
            text: 'Аниме'
        },
        {
            name: 'mangas',
            text: 'Манга'
        },
        {
            name: 'ranobe',
            text: 'Ранобэ'
        },
        {
            name: 'characters',
            text: 'Персонаж'
        },
    ]

    const radioChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setActiveCat(e.target.value)
    }
    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }
    const onClose = (e: React.MouseEvent<HTMLSpanElement>) => {
        setValue('')
        setHeaderClass(headerClass)
        dispatch(hideShade())
    }

    const categoryTSX = categories.map((cat) => <React.Fragment key={cat.name}>
        <input
            id={cat.name}
            value={cat.name}
            type="radio"
            name={'category'}
            defaultChecked={activeCat === cat.name}
            onChange={radioChangeHandler}
        />
        <label htmlFor={cat.name}>{cat.text}</label>
    </React.Fragment>)

    const itemsListTSX = searchItems.map((item) =>
        <SearchItem
            key={item.id}
            id={item.id}
            name={item.name}
            russian={item.russian}
            image={item.image.preview}
            url={item.url}
            kind={'kind' in item ? item.kind : undefined}
            score={'score' in item ? item.score : undefined}
            status={'status' in item ? item.status : undefined}
            aired_on={'aired_on' in item ? item.aired_on : undefined}
            episodes={'episodes' in item ? item.episodes : undefined}
            volumes={'volumes' in item ? item.volumes : undefined}
            category={activeCat}
        />
    )

    const focusHandler = (e: React.FocusEvent<HTMLInputElement>) => {
        setHeaderClass(headerClassWithPanel)
        setSearchClass(cl.search + ' ' + cl.active)
        dispatch(showShade('search'))
    }

    return (
        <div className={searchClass}>
            <div className={cl.input}>
                <input
                    className='search_for_dropdown'
                    placeholder={'Поиск...'}
                    type="text"
                    value={value}
                    onChange={inputChangeHandler}
                    onFocus={focusHandler}
                />
                <span className={cl.leftSvg}></span>
                <span className={cl.clear} onClick={onClose}></span>
            </div>
            <div className={cl.category}>
                {searching
                    ? loading ? <Loader /> : itemsListTSX
                    : categoryTSX
                }
            </div>
        </div>
    );
};

export default Search;