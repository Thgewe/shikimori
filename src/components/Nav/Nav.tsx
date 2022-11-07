import React, {FC} from 'react';
import cl from './nav.module.css'
import {NavLink} from "react-router-dom";
import {ALL_ANIME_ROUTE, ALL_MANGA_ROUTE, ALL_RANOBE_ROUTE} from "../../utils/constants";

const Nav: FC = () => {

    return (
        <div className={cl.nav}>
            <div className={cl.group}>
                <div className={cl.title}>БАЗА ДАННЫХ</div>
                <NavLink to={ALL_ANIME_ROUTE} title={'аниме'}>Аниме</NavLink>
                <NavLink to={ALL_MANGA_ROUTE} title={'манга'}>Манга</NavLink>
                <NavLink to={ALL_RANOBE_ROUTE} title={'ранобэ'}>Ранобэ</NavLink>
            </div>
        </div>
    );
};

export default Nav;