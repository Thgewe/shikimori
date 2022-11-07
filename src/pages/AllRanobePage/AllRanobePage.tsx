import React, {FC} from 'react';
import cl from './allRanobePage.module.css'
import CommonListPage from "../CommonListPage/CommonListPage";

const AllRanobePage: FC = () => {
    return (
        <div className={cl.page}>
            <CommonListPage type={'ranobe'} />
        </div>
    );
};

export default AllRanobePage;