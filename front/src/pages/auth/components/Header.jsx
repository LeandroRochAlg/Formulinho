import "../../../styles/components/header.css";
import React from 'react'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronDown} from '@fortawesome/free-solid-svg-icons';
import {motion as m} from "framer-motion";

const Header = () => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
    setOpen(!open);
    }

    return (
        <nav className="navbar" >
            <div className="nav-icon">
                <button className="nav-button" onClick={handleOpen}> 
                    <img id="icon" src="https://www.svgrepo.com/show/147337/f1-helmet.svg" data-i18n="[alt]nav.logo" alt="Formula1"/>  
                    <span className="username">hamilton44</span>
                    <FontAwesomeIcon className="username" icon={faChevronDown} style={{fontSize: "1rem", paddingTop: '3px'}}/>  
                </button> 
                {open ? (
                    <ul className="Menu">
                        <li className="Menu-item">
                            <Link className="op-item">Perfil</Link>
                        </li>
                        <li className="Menu-item">
                            <Link className="op-item">Sair</Link>
                        </li>
                    </ul>
                ) : null}
                  
            </div>
        </nav>
    );
    }

export default Header;