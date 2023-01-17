import React, {FC} from 'react';
import cl from './slideMenuMobile.module.css';

interface ISlideMenuMobileProps {
    leftElements: any,
    rightElements: any,
}

const SlideMenuMobile: FC<ISlideMenuMobileProps> = ({
                                                        leftElements,
                                                        rightElements
}) => {

    const rightWidth = 250;

    const toggleMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        if ((e.target as HTMLDivElement).classList.contains(cl.menuButton)) {
            e.currentTarget.classList.toggle(cl.rightOn);
            e.currentTarget.style.transform =
                e.currentTarget.style.transform === `translateX(${-rightWidth}px)`
                    ? `translateX(0)`
                    : `translateX(${-rightWidth}px)`;
            (e.target as HTMLDivElement).classList.toggle(cl.active);
            (e.target as HTMLDivElement).style.transform =
                (e.target as HTMLDivElement).style.transform === `rotate(-90deg) translate(60%, ${rightWidth + 20}px)`
                    ? `rotate(-90deg) translate(60%, 20px)`
                    : `rotate(-90deg) translate(60%, ${rightWidth + 20}px)`;
        }
    }

    return (
        <div
            className={cl.track}
            onClick={toggleMenu}
        >
            <div className={cl.menuButton}>
                меню
            </div>
            <div className={cl.left}>
                {leftElements}
            </div>
            <div
                className={cl.right}
                style={{
                    width: rightWidth + 'px',
                    transform: `translateX(${rightWidth}px)`,
                }}>
                {rightElements}
            </div>
        </div>
    );
};

export default SlideMenuMobile;