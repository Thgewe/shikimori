import React, {FC} from 'react';
import cl from './personPage.module.css';
import {useParams} from "react-router-dom";

// TODO: Person page

const PersonPage: FC = () => {

    const params = useParams()

    return (
        <div>
            {"Пока пусто " + params.id}
        </div>
    );
};

export default PersonPage;