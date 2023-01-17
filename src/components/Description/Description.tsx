import React, {FC} from 'react';
import cl from './description.module.css';
import BlockName from "../BlockName/BlockName";

interface IDescriptionProps {
    description: string | null
}

const Description: FC<IDescriptionProps> = ({description}) => {
    return (
        <div className={cl.description}>
            <BlockName type={'default'} text={'ОПИСАНИЕ'} />
            <div className={cl.text}>{description ? description : 'Нет описания'}</div>
        </div>
    );
};

export default Description;