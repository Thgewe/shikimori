import React, {FC, useEffect, useRef, useState} from 'react';
import cl from './cardSlider.module.css';
import {IShortAnime} from "../../models/IShikimoriApi";
import SliderCard from "../SliderCard/SliderCard";
import {debounce} from "../../utils/debounce";

interface CardSliderProps {
    cards: IShortAnime[],
}

const CardSlider: FC<CardSliderProps> = ({cards}) => {

    const maxHeight = 240;
    const gapBetweenTrackItems = 15;
    const widthCoefficientRelativeToHeight = 0.7;
    const heightCoefficientRelativeToWindowWidth = 0.4;

    const [height, setHeight] = useState(
        window.innerWidth * heightCoefficientRelativeToWindowWidth < maxHeight
                ? window.innerWidth * heightCoefficientRelativeToWindowWidth
                : maxHeight
    )
    const [translate, setTranslate] = useState(0)
    const track = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const resizeWindow = debounce(() => {
            setHeight(window.innerWidth * heightCoefficientRelativeToWindowWidth < maxHeight
                    ? window.innerWidth * heightCoefficientRelativeToWindowWidth
                    : maxHeight
            )
        }, 100)

        window.addEventListener('resize', resizeWindow)

        setTimeout(() => {
            setHeight(window.innerWidth * heightCoefficientRelativeToWindowWidth < maxHeight
                    ? window.innerWidth * heightCoefficientRelativeToWindowWidth
                    : maxHeight
            )
        }, 500)
        return () => window.removeEventListener('resize', resizeWindow)
    }, [])

    const onLeftClick = (e: React.MouseEvent<HTMLDivElement>) => {
        setTranslate(prevState => prevState + Math.round(height * widthCoefficientRelativeToHeight)
            >= 0 ? 0 : prevState + Math.round(height * widthCoefficientRelativeToHeight) + gapBetweenTrackItems)
    }
    const onRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
        setTranslate(prevState => track.current!.clientWidth - track.current!.scrollWidth >
        prevState - height * widthCoefficientRelativeToHeight
            ? track.current!.clientWidth - track.current!.scrollWidth
            : prevState - height * widthCoefficientRelativeToHeight - gapBetweenTrackItems)
    }

    return (
        <div className={cl.slider}>
            <div
                className={cl.track}
                style={{height: height, transform: `translate(${translate}px)`}}
                ref={track}
            >
                {cards.map((card) => <SliderCard
                        id={card.id}
                        title={card.name}
                        image={card.image.preview}
                        path={'/animes/'}
                        width={height * widthCoefficientRelativeToHeight}
                    />)
                }
            </div>
            <div className={cl.buttons}>
                <div className={cl.left} onClick={onLeftClick}></div>
                <div className={cl.right} onClick={onRightClick}></div>
            </div>
        </div>
    );
};

export default CardSlider;