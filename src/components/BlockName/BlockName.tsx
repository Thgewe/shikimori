import React, {FC} from 'react';
import cl from './blockName.module.css';

interface BlockNameProps {
    type: 'news' | 'more news' | 'comments' | 'filter' | 'onTheScreens' | 'default',
    text?: string,
}

const BlockName: FC<BlockNameProps> = ({type, text= ''}) => {

    let obj = {
        className: cl.heading,
        content: 'НОВОСТИ'
    }

    switch(type) {
        case 'news':
            obj.className += ' ' + cl.news
            obj.content = 'НОВОСТИ'
            break;
        case 'more news':
            obj.className += ' ' + cl.allNews
            obj.content = 'ЕЩЕ НОВОСТИ'
            break;
        case 'comments':
            obj.className += ' ' + cl.comments
            obj.content = 'КОММЕНТАРИИ'
            break;
        case 'filter':
            obj.className += ' ' + cl.filter
            obj.content = text
            break;
        case 'onTheScreens':
            obj.className += ' ' + cl.onTheScreens
            obj.content = 'СЕЙЧАС НА ЭКРАНАХ'
            break;
        case 'default':
            obj.className += ' ' + cl.default
            obj.content = text
            break;
    }

    return (
        <h2
            className={obj.className}
        >
            {obj.content}
        </h2>
    );
};

export default BlockName;