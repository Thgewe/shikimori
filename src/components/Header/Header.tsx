import React, {FC, useEffect, useState} from 'react';
import cl from './header.module.css'
import {Link} from "react-router-dom";
import Dropdown from "../Dropdown/Dropdown";
import Search from "../Search/Search";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {shadeSlice} from "../../store/reducers/ShadeSlice";

const Header: FC = () => {

    const [headerClass, setHeaderClass] = useState<string>(cl.header);
    const isShadeActive = useAppSelector(state => state.shadeReducer.isActive)
    const {hideShade, showShade} = shadeSlice.actions
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!isShadeActive) {
            setHeaderClass(cl.header)
        }
    }, [isShadeActive])

    const searchClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        if (headerClass === cl.header + ' ' + cl.searchpanel) {
            dispatch(hideShade())
            setHeaderClass(cl.header)
        } else {
            dispatch(showShade('search'))
            setHeaderClass(cl.header + ' ' + cl.searchpanel)
        }
    }

    return (
        <header className={headerClass}>
            <div className={cl.burger}>
                <Dropdown headerClass={cl.header} setClass={setHeaderClass}/>
            </div>
            <Link className={cl.logoContainer} to={'/'} title={'shikimori'}>
                <div className={cl.kanji}></div>
                <div className={cl.logo}></div>
            </Link>
            <div className={cl.searchBtn} onClick={searchClickHandler}></div>
            <div className={cl.searchField}>
                <Search
                    setHeaderClass={setHeaderClass}
                    headerClass={cl.header}
                    headerClassWithPanel={cl.header + ' ' + cl.searchpanel}
                    currentHeaderClass={headerClass}
                />
            </div>
            <div className={cl.profileBurger}></div>
        </header>
    );
};

export default Header;