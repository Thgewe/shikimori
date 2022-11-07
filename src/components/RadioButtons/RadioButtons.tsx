import React, {FC} from 'react';
import cl from './radioButtons.module.css';

interface RadioButtonsProps {
    inputs: {id: string, value: string, label: string}[],
    name: string,
    clickHandler: React.MouseEventHandler<HTMLInputElement>,
}

const RadioButtons: FC<RadioButtonsProps> = ({
                                                 inputs,
                                                 name,
                                                 clickHandler
}) => {
    return (
        <div className={cl.buttons}>
            {inputs.map((input) => <div key={input.id} className={cl.btn}>
                <input
                    id={input.id}
                    type={'radio'}
                    onClick={clickHandler}
                    name={name}
                    value={input.value}
                    defaultChecked={input.value === 'order=ranked'}
                />
                <label className={cl.fake} htmlFor={input.id}></label>
                <label className={cl.label} htmlFor={input.id}>{input.label}</label>
            </div>)}
        </div>
    );
};

export default RadioButtons;