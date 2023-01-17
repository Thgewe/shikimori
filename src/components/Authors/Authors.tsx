import React, {FC, useEffect} from 'react';
import cl from './authors.module.css';
import {IRoles} from "../../models/IShikimoriApi";
import Loader from "../Loader/Loader";
import RelatedAndAuthorItem from "../RelatedAndAuthorItem/RelatedAndAuthorItem";
import BlockName from "../BlockName/BlockName";

interface IAuthorsProps {
    authors: IRoles[],
    loading: boolean,
    error: string,
    category: 'animes' | 'mangas' | 'ranobe',
}

const Authors: FC<IAuthorsProps> = ({
                                        authors,
                                        loading,
                                        error,
                                        category,
}) => {
    if (loading) return <div className={cl.authors}>
        <BlockName type={'default'} text={'АВТОРЫ'} />
        <Loader />
    </div>
    else if (error) return <div>{error}</div>
    return (
        <div className={cl.authors}>
            <BlockName type={'default'} text={'АВТОРЫ'} />
            {authors.map((role) =>
                <RelatedAndAuthorItem
                    key={role.person!.id}
                    id={role.person!.id}
                    name={role.person!.name}
                    image={role.person!.image.preview}
                    hidden={false}
                    category={category}
                    showAll={true}
                    roles={role.roles_russian}
                />
            )}
        </div>
    );
};

export default Authors;