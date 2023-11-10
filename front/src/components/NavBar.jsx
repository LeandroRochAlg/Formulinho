import "../styles/components/navbarcss.css";

const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="nav-logo">
                    <a href='/'><img id="f1" src="https://account.formula1.com/images/f1_logo.svg" data-i18n="[alt]nav.logo" alt="Formula1"/></a>
                </div>
                <div className="nav-list">
                    <li className="nav-item" id="login">
                        <a href="/login">Login</a>
                    </li>
                    <li className="nav-item">
                        <a href="/register" >Register</a>
                    </li>
                </div>
            </div>
        </nav>
    );
    }

export default NavBar;