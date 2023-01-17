import React, {FC} from 'react';
import cl from './ratesDiagram.module.css';
import {IRatesStats} from "../../models/IShikimoriApi";
import BlockName from "../BlockName/BlockName";

interface IRatesDiagramProps {
    rates: IRatesStats[],
    name: string,
}

const RatesDiagram: FC<IRatesDiagramProps> = ({rates, name}) => {

    const max = Math.max(...rates.map((rate) => rate.value))

    const color = {
        eightPlus: '#4682b4',
        sixToEight: '#6295bd',
        fourToSix: '#79a9cf',
        belowFour: '#98c2e3',
    }

    return (
        <div className={cl.rates}>
            <BlockName type={'default'} text={name} />
            {rates.map((rate) =>
                <React.Fragment key={rate.name}>
                    <div
                        className={cl.left}
                        title={rate.value + ''}
                        style={{
                            width: rate.value / max * 100 + '%',
                            background:
                                rate.value / max < 0.3
                                    ? color.belowFour
                                    : rate.value / max < 0.5
                                    ? color.fourToSix
                                    : rate.value / max < 0.75
                                    ? color.sixToEight
                                    : color.eightPlus}}
                    >
                        {rate.value}
                    </div>
                    <div className={typeof rate.name === 'number'
                        ? cl.right
                        : cl.right + ' ' + cl.string}
                    >{rate.name}</div>
                </React.Fragment>
            )}
        </div>
    );
};

export default RatesDiagram;