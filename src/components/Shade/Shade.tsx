import React, {FC} from 'react';
import cl from './shade.module.css';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {shadeSlice} from "../../store/reducers/ShadeSlice";

const Shade: FC = () => {

    const {isActive, type} = useAppSelector(state => state.shadeReducer)
    const dispatch = useAppDispatch()
    const {toggleShade} = shadeSlice.actions

    return (
        <div
            className={isActive
                ? type === 'drop'
                    ? cl.shade + ' ' + cl.active + ' ' + cl.drop
                    : cl.shade + ' ' + cl.active + ' ' + cl.search
                : cl.shade}
            onClick={() => dispatch(toggleShade())}
        >
        </div>
    );
};

export default Shade;