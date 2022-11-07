import React, {FC, PropsWithChildren, useEffect, useRef, useState} from 'react';
import cl from './slider.module.css';

interface IStyle {
    height: number,
    transform: number,
    counter: number,
}

const Slider: FC<PropsWithChildren> = ({children}) => {

    const heightCoefficientRelativeToWindowWidth = 0.37;
    const gapBetweenTrackItems = 5;
    const maxHeight = 264;
    const heightIfMoreThanMaxHeight = 132;

    const [style, setStyle] = useState<IStyle>({
        height: window.innerWidth * heightCoefficientRelativeToWindowWidth,
        transform: 0,
        counter: 0,
    })
    const [nodes, setNodes] = useState<Element[]>([])
    const track = useRef<HTMLDivElement>(null)

    useEffect(() => {
        window.addEventListener('resize', resizeWindow)
        function resizeWindow () {
            setStyle({...style, height: window.innerWidth * heightCoefficientRelativeToWindowWidth})
        }
        const arr = []
        for (let i = 0; i < track.current!.children.length; i++) {
            arr.push(track.current!.children[i])
        }
        setNodes(arr)

        // Waiting for elements to load to get exact window width
        setTimeout(() => {
            setStyle({...style})
        }, 300)
        return () => window.removeEventListener('resize', resizeWindow)
    }, [])

    const leftClick = () => {
        if (0 < style.counter) {
            setStyle({
                ...style,
                transform: style.transform + nodes[style.counter].clientWidth + gapBetweenTrackItems > 0
                    ? 0
                    : style.transform + nodes[style.counter].clientWidth + gapBetweenTrackItems,
                counter: style.counter - 1,
            })
        }
    }
    const rightClick = () => {
        if (nodes.length - 1 > style.counter) {
            setStyle({
                ...style,
                transform: track.current!.clientWidth - track.current!.scrollWidth >
                    style.transform - nodes[style.counter].clientWidth
                        ? track.current!.clientWidth - track.current!.scrollWidth
                        : style.transform - nodes[style.counter].clientWidth - gapBetweenTrackItems,
                counter: style.counter + 1,
            })
        }
    }

    return (
        <div className={cl.slider}>
            <div
                className={cl.track}
                ref={track}
                style={{height: style.height > maxHeight ? heightIfMoreThanMaxHeight : style.height, transform: `translate(${style.transform}px)`}}
            >
                {children}
            </div>
            {
                track.current
                    ? <div className={
                            track.current!.scrollWidth <= track.current!.clientWidth
                                ? cl.hide
                                :  cl.buttons
                        }
                    >
                        <div className={cl.left} onClick={leftClick}></div>
                        <div className={cl.right} onClick={rightClick}></div>
                    </div>
                    : <div></div>
            }
        </div>
    );
};

export default Slider;