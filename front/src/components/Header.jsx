import "../styles/components/header.css";
import React from 'react'
import { Link } from "react-router-dom";
import {FaChevronDown} from "react-icons/fa6";

const Header = () => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
    setOpen(!open);
    }

    return (
        <nav className="navbar" >
            <div className="nav-itens">
                <ul className="header-list">
                    <li> <Link to="/home"> Início </Link> </li>
                    <li> <Link to="/search"> Busca </Link> </li>
                    <li> <Link to="/profile"> Perfil </Link> </li>
                </ul>
            </div>
            <button className="nav-button" onClick={handleOpen}>  
                <span className="username">hamilton44</span>
                <FaChevronDown className="username-icon" style={{fontSize: "1rem", paddingTop: '3px'}}/>  
            </button> 
            {open ? (
                <ul className="Menu">
                    <li className="Menu-item">
                        <Link className="op-item">Sair</Link>
                    </li>
                </ul>
            ) : null}
        </nav>
    );
    }

export default Header;