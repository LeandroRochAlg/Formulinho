import "../styles/components/header.css";
import React from "react";
import { Link, useNavigate} from "react-router-dom";
import { FaChevronDown } from "react-icons/fa6";
import { useState, useEffect } from "react";
import api from "../libs/api";

const Header = () => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState(" ");
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("token");


  const logout = async (e) => {
    e.preventDefault();
    
    try {
      const response = await api.post("/logout");
      setMsg(response.message);
      console.log(msg);
      localStorage.removeItem("token");
      navigate('/auth/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const fetchUser = async () => {
    api.get("/users").then((response) => setUser(response.data));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-itens">
        <ul className="header-list">
          <li>
            {" "}
            <Link to={isAuthenticated ? "/system/home" : "/auth/home"}> Início </Link>{" "}
          </li>
          <li>
            {" "}
            <Link to="/system/search"> Busca </Link>{" "}
          </li>
          <li>
            {" "}
            <Link to="/system/profile"> Perfil </Link>{" "}
          </li>
        </ul>
      </div>
      <button className="nav-button" onClick={handleOpen}>
        <span className="username">{user ? user.username : ""}</span>
        <FaChevronDown
          className="username-icon"
          style={{ fontSize: "1rem", paddingTop: "3px" }}
        />
      </button>
      {open ? (
        <ul className="Menu">
          <li className="Menu-item" onClick={logout}>
            <Link className="op-item" >Sair</Link>
          </li>
          <li className="Menu-item">
            <Link className="op-item" to="/system/about">Sobre</Link>
          </li>
        </ul>
      ) : null}
    </nav>
  );
};

export default Header;
