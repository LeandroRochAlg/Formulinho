import "../../../styles/components/header.css";
import React from 'react'
import { Link } from "react-router-dom";

const Header = () => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
    setOpen(!open);
    }

    return (
        <nav className="navbar" >
            <div className="nav-icon">
            <button className="nav-button" onClick={handleOpen}> <img id="icon" src="https://www.svgrepo.com/show/147337/f1-helmet.svg" data-i18n="[alt]nav.logo" alt="Formula1"/> </button> 
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