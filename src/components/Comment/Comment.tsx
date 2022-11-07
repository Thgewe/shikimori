import React, {FC, useEffect, useState} from 'react';
import cl from './comment.module.css';
import {Link} from "react-router-dom";
import {IComments, IUser} from "../../models/IShikimoriApi";
import {getTimeSpan, timePassed} from "../../utils/time";

interface CommentProps {
    body: string,
    updated_at: string,
    created_at: string,
    user: IUser,
    commentable_id: number,
    reply_to: {
        nickname: string,
        id: string,
    },
}

interface ICommentBody {
    text: string,
    to: number | null,
    replies: string[],
}

// TODO: - replies
//       - comment page
//       - tags (example: [anime=:id][/anime])

const Comment: FC<CommentProps> = ({
                                       body,
                                       updated_at,
                                       created_at,
                                       user,
                                       commentable_id,
                                       reply_to,

}) => {

    const [comment, setComment] = useState<ICommentBody>({
        text: '',
        to: null,
        replies: [],
    })

    useEffect(() => {
        setComment({
            text: body
                    .replace(/\[comment=\d+;\d+]/, '')
                    .replace(/\[replies=.+]/, ''),
            to: body.match(/(?<=\[comment=\d*;)\d*/) ? +body.match(/(?<=\[comment=\d*;)\d*/)![0] : null,
            replies: body.match(/(?<=\[replies=)\d*|(?<=\d*,)\d+/g)
                ? body.match(/(?<=\[replies=)\d*|(?<=\d*,)\d+/g)!
                : [],
        })
    }, [])

    return (
        <div className={cl.comment}>
            <div className={cl.user}>
                <img className={cl.avatar} src={user.avatar} alt={''}></img>
                <Link className={cl.nickname} to={'/users/' + user.id}>{user.nickname}</Link>
                <div className={cl.created}>{timePassed(getTimeSpan(updated_at))}</div>
            </div>
            <div className={cl.text}><Link to={'/users/' + reply_to.id} className={cl.appeal}>{comment.to ? '@' + reply_to.nickname : ''}</Link>{comment.text}</div>
            {/*<div className={cl.replies}>{comment.replies.map((id) => <div></div>)}</div>*/}
        </div>
    );
};

export default Comment;