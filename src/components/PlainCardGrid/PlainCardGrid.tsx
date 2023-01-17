import React, {FC, useEffect} from 'react';
import cl from './plainCardGrid.module.css';
import BlockName from "../BlockName/BlockName";
import Loader from "../Loader/Loader";
import {IRoles} from "../../models/IShikimoriApi";
import {API_IMAGE_URL} from "../../utils/constants";
import {Link} from "react-router-dom";


export interface IPlainCard {
    id: number,
    name: string,
    image: string,
}

interface IPlainCardGridProps {
    loading: boolean,
    items: IPlainCard[],
    category: string,
    blockName: string,
}

const PlainCardGrid: FC<IPlainCardGridProps> = ({
                                                    loading,
                                                    items,
                                                    category,
                                                    blockName,
}) => {
    if (loading) return <div className={cl.block}>
        <BlockName type={'default'} text={blockName} />
        <Loader />
    </div>

    return (
        <div className={cl.block}>
            <BlockName type={'default'} text={blockName} />
            <div className={cl.grid}>
                {items.map((item) =>
                    <Link className={cl.card} key={item.id} to={'/' + category + '/' + item.id}>
                        <img src={API_IMAGE_URL + item.image} alt={item.name}/>
                        <div className={cl.name}>{item.name}</div>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default PlainCardGrid;