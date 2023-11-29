import "../../../styles/components/header.css";
import React from 'react'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronDown} from '@fortawesome/free-solid-svg-icons';

const Header = () => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
    setOpen(!open);
    }

    return (
        <nav className="navbar" >
            <div className="nav-itens">
                <ul className="header-list">
                    <li> Home </li>
                    <li> Database </li>
                </ul>
            </div>
            <div className="nav-button-container">
                <button className="nav-button" onClick={handleOpen}>  
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