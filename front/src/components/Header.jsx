import "../styles/components/header.css";
import React from "react";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa6";
import { useState, useEffect } from "react";
import api from "../libs/api";

const Header = () => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState(" ");
  const isAuthenticated = localStorage.getItem("token");


  const logout = (e) => {
    e.preventDefault();
    api.post("/logout").then((response) => setMsg(response.message));
    console.log(msg);
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
        </ul>
      ) : null}
    </nav>
  );
};

export default Header;
