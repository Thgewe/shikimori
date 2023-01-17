import React, {FC} from 'react';
import cl from './informationProperty.module.css';

interface IInformationProperty {
    name: string,
    value: string | number,
}

const InformationProperty: FC<IInformationProperty> = ({name, value}) => {

    if (value === undefined || value === '')
        return null

    return (
        <div className={cl.prop}>
            <div className={cl.name}>{name + ': '}</div>
            <div className={cl.value}>{value}</div>
        </div>
    );
};

export default InformationProperty;