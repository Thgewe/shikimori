import React, {FC, useEffect, useState} from 'react';
import cl from './comments.module.css';
import BlockName from "../BlockName/BlockName";
import Comment from "../Comment/Comment";
import {IComments} from "../../models/IShikimoriApi";

interface CommentsProps {
    comments: IComments[]
}
interface User {
    [index: number]: string,
    [index: string]: string,
}

const Comments: FC<CommentsProps> = ({comments}) => {

    const [users, setUsers] = useState<User>({})

    useEffect(() => {
        const obj: User = {}
        comments.map((comment) => {
            obj[comment.user.id] = comment.user.nickname
            obj[comment.user.nickname] = comment.user.id + ''
        })
        setUsers(obj)
    }, [])

    return (
        <div className={cl.comments}>
            <BlockName type={"comments"} />
            {comments.map((comment) =>
                <Comment
                    key={comment.id}
                    body={comment.body}
                    updated_at={comment.updated_at}
                    created_at={comment.created_at}
                    user={comment.user}
                    commentable_id={comment.commentable_id}
                    reply_to={{
                        nickname: users[comment.body.match(/(?<=\[comment=\d*;)\d*/) ? +comment.body.match(/(?<=\[comment=\d*;)\d*/)![0] : ''],
                        id: users[users[comment.body.match(/(?<=\[comment=\d*;)\d*/) ? +comment.body.match(/(?<=\[comment=\d*;)\d*/)![0] : '']]
                    }}
                />
            )}
        </div>
    );
};

export default Comments;