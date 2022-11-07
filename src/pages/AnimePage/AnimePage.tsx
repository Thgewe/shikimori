import React, {FC} from 'react';
import cl from './animePage.module.css';
import {useParams} from "react-router-dom";

type TAnimeParams = {
    id: string;
}

const AnimePage: FC = () => {

    const params = useParams<TAnimeParams>()

    return (
        <div>
            {params.id}
        </div>
    );
};

export default AnimePage;