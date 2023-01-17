import React, {FC} from 'react';
import cl from './studio.module.css';
import BlockName from "../BlockName/BlockName";
import {IStudio} from "../../models/IShikimoriApi";
import {API_IMAGE_URL} from "../../utils/constants";

interface IStudioProps {
    studios: IStudio[],
}

const Studio: FC<IStudioProps> = ({studios}) => {
    return (
        <div className={cl.studio}>
            <BlockName type={"default"} text={'СТУДИЯ'} />
            <div className={cl.images}>
                {studios.map((studio) =>
                    <img key={studio.name} src={API_IMAGE_URL + studio.image} alt={studio.name} />)}
            </div>
        </div>
    );
};

export default Studio;