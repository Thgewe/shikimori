import React from 'react';
import cl from './allMangaPage.module.css';
import CommonListPage from "../CommonListPage/CommonListPage";

const AllMangaPage = () => {

    return (
        <div className={cl.page}>
            <CommonListPage type={'mangas'} />
        </div>
    );
};

export default AllMangaPage;