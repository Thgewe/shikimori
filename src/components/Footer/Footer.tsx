import React, {FC} from 'react';
import cl from './footer.module.css';

const Footer: FC = () => {
    return (
        <footer className={cl.footer}>
            Powered by <a href={'https://shikimori.one/api/doc/1.0'}>Shikimori API</a>
        </footer>
    );
};

export default Footer;