import React, {FC} from 'react';
import cl from './loader.module.css';
import loader1 from '../../images/svg/loader-blue-cat.svg'
import loader2 from '../../images/svg/loader-cutie-fox.svg'
import loader3 from '../../images/svg/loader-kaki-dog.svg'
import loader4 from '../../images/svg/loader-midori-kappa.svg'
import loader5 from '../../images/svg/loader-pinky-pig.svg'
import loader6 from '../../images/svg/loader-spooky-ghost.svg'

const Loader: FC = () => {

    const loaders = [loader1, loader2, loader3, loader4, loader5, loader6]

    return (
        <div className={cl.loader}>
            <img src={loaders[Math.floor(Math.random() * 6)]} alt=""/>
        </div>
    );
};

export default Loader;