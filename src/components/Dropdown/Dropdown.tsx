import React, {FC, useEffect, useRef, useState} from 'react';
import cl from './dropdown.module.css';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {shadeSlice} from "../../store/reducers/ShadeSlice";
import Nav from "../Nav/Nav";

interface DropProps {
    headerClass: string,
    setClass: React.Dispatch<React.SetStateAction<string>>
}

const Dropdown: FC<DropProps> = ({headerClass, setClass}) => {

    const dropdown = useRef<HTMLDivElement>(null)
    const [isActive, setIsActive] = useState<boolean>(false);
    const isShadeActive = useAppSelector(state => state.shadeReducer.isActive)
    const {hideShade, showShade} = shadeSlice.actions
    const location = useAppSelector(state => state.locationReducer)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!isShadeActive && window.innerWidth < 768) {
            setIsActive(false)
        }
        return () => {
            document.removeEventListener('click', documentListener)
        }
    }, [isShadeActive])

    const documentListener = (e: MouseEvent) => {
        if (!dropdown.current!.contains(e.target as HTMLElement)) {
            if ((e.target as HTMLDivElement).className.includes('search')) {
                setIsActive(false)
                document.removeEventListener('click', documentListener)
            } else {
                document.removeEventListener('click', documentListener)
                dispatch(hideShade())
            }
        }
    }

    const burgerClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isActive) {
            setIsActive(false)
            dispatch(hideShade())
        } else {
            setClass(headerClass)
            setIsActive(true)
            dispatch(showShade('drop'))
        }
        setTimeout(() => {
            document.addEventListener('click', documentListener)
        }, 0)
    }
    const listClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!(e.target instanceof HTMLDivElement) && !(e.target as HTMLElement).classList.contains('active')) {
            setIsActive(false)
        }
    }

    return (
        <div className={cl.dropdown} ref={dropdown}>
            <div
                className={isActive ? cl.button + ' ' + cl.active : cl.button}
                onClick={burgerClickHandler}
            >
                <span></span>
                <span
                    data-content={location.data}
                    className={location.data ? cl.hide : undefined}
                >
                    {location.text}
                </span>
                <span></span>
            </div>
            <div
                className={isActive ? cl.list + ' ' + cl.active : cl.list}
                onClick={listClickHandler}
            >
                <Nav />
            </div>
        </div>
    );
};

export default Dropdown;