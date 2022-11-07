import React, {FC} from 'react';
import cl from './sliderCard.module.css';
import {Link} from "react-router-dom";
import {API_IMAGE_URL} from "../../utils/constants";

interface SliderCardProps {
    id: number,
    title: string,
    image: string,
    path: string,
    width: number,
}

const SliderCard: FC<SliderCardProps> = ({
                                             id,
                                             title,
                                             image,
                                             path,
                                             width,
}) => {

    return (
        <Link className={cl.card} to={path + id} style={{width}}>
            <div className={cl.image} style={{width}}>
                <img src={API_IMAGE_URL + image} alt={title}/>
            </div>
            <div className={cl.title}>{title}</div>
        </Link>
    );
};

export default SliderCard;