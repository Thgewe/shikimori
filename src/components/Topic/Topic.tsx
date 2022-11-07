import React, {FC} from 'react';
import cl from './topic.module.css';

interface TopicProps {
    text: string,
    type?: 'news' | 'default',
}

const Topic: FC<TopicProps> = ({text, type = 'default'}) => {
    return (
        <div className={type === "default" ? cl.topic : cl.topic + ' ' + cl.orange}>
            {text}
        </div>
    );
};

export default Topic;