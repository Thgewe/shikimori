import React, {FC} from 'react';
import cl from './pageHeadline.module.css';
import {Link} from "react-router-dom";

interface IPageHeadlineProps {
    titleRu?: string,
    titleEn?: string,
}

const PageHeadline: FC<IPageHeadlineProps> = ({titleRu, titleEn}) => {
    return (
        <h1 className={cl.headline}>
            <Link
                className={cl.link}
                title={'Обновить страницу'}
                to={'.'}
            >
                {
                    titleEn ? <div>{titleRu}<span>  /  </span>{titleEn}</div> : titleRu
                }
            </Link>
        </h1>
    );
};

export default PageHeadline;