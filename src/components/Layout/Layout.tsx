import React, {FC, PropsWithChildren} from 'react';
import cl from './layout.module.css'
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Shade from "../Shade/Shade";

const Layout: FC<PropsWithChildren> = ({children}) => {
    return (
        <div className={cl.layout}>
            <div className={cl.header}>
                <Header />
            </div>
            <main className={cl.main}>
                {children}
            </main>
            <Footer />
            <Shade />
        </div>
    );
};

export default Layout;