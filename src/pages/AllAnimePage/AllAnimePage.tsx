import React, {FC} from 'react';
import cl from './allAnimePage.module.css';
import CommonListPage from "../CommonListPage/CommonListPage";

const AllAnimePage: FC = () => {
    return (
        <div className={cl.page}>
            <CommonListPage type={'animes'} />
        </div>
    );
};

export default AllAnimePage;