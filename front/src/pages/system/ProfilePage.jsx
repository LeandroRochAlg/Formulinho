import React from "react";
import Header from "../../components/Header";
import { useState, useEffect, useRef } from "react";
import api from "../../libs/api";
import "../../styles/system/profilecss.css";

const ProfilePage = () => {

  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState(" ");
  const [msg1, setMsg1] = useState(" ");
  const [msg2, setMsg2] = useState(" ");

  const username = useRef(null);
  const email = useRef(null);
  const newPassword = useRef(null);
  const actualPassword = useRef(null);
  const confirmPassword = useRef(null);

  const updateInfo = (e) => {
    e.preventDefault();
    const data = {
      username: username.current.value,
      email: email.current.value,
    };
    console.log("Data submitted:", data);
    api.put("/users", data).then((response) => setMsg(response.data.message));
  };

  const updatePassword = (e) => {
    e.preventDefault();
    const data = {
      newPassword: newPassword.current.value,
      actualPassword: actualPassword.current.value,
      confirmPassword: confirmPassword.current.value,
    };
    console.log("Data submitted:", data);
    api.put("/users/password", data).then((response) => setMsg1(response.data.message));
    console.log(msg1);
  };

  const deleteUser = (e) => {
    e.preventDefault();
    console.log("Data submitted:", data);
    api.delete("/users").then((response) => setMsg2(response.message));
    setOpen(false);
    console.log(msg2);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/users");
        setUser(response.data);
      } catch (error) {
      }
    };

  fetchUser();
}, []);

console.log(`cuzinho ${user}`);

  return (
    <>
      <Header />
      <div className="profile-body">
        <div className="button-grid">
          <section>
            <form onSubmit={updateInfo}>
              <h2>Alterar Nome</h2>
              <p>Alterar informações básicas do perfil</p>
              <input
                type="text"
                name="username"
                defaultValue={user ? user.username : ""}
                ref={username}
                required
              />
              <input 
                type="email" 
                name="email"
                defaultValue={user ? user.email : ""}
                ref={email}
                required
              />
              <button>Atualizar</button>
              {msg && (
              <div className="error-profile">
                <p>{msg}</p>
              </div>
              )}
            </form>
          </section>
          <section>
            <form onSubmit={updatePassword}>
              <h2>Alterar Senha</h2>
              <p>Certifique-se que está escolhendo uma senha segura</p>
              <input 
                type="password" 
                name="newPassword" 
                placeholder="Nova senha" 
                ref={newPassword}  
                />
              <input 
                type="password" 
                name="confirmPassword" 
                placeholder="Confirme Senha" 
                ref={confirmPassword}
              />
              <input 
                type="password" 
                name="actualPassword" 
                placeholder="Senha" 
                ref={actualPassword}
              />
              <button>Atualizar</button>
              {msg1 && (
              <div className="error-profile">
                <p>{msg1}</p>
              </div>
              )}
            </form>
          </section>
          <section>
            <h2>Excluir Conta</h2>
            <p>Essa ação não pode ser desfeita</p>
            <button
              id="delete"
              onClick={() => {
                setOpen(true);
              }}
            >
              Deletar conta
            </button>
            {msg2 && (
              <div className="error-profile">
                <p>{msg2}</p>
              </div>
              )}
          </section>
        </div>
      </div>
      {open ? (
        <div className="float" style={{ display: "absolute" }}>
          <grid className="modal">
            <h2>Tem certeza que deseja excluir sua conta?</h2>
            <p>
              Todos os seus dados serão apagados e não será possível
              recuperá-los novamente.
            </p>
            <button id="delete" onClick={deleteUser}>Confirmar</button>
            <button
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancelar
            </button>
          </grid>
        </div>
      ) : null}
    </>
  );
};

export default ProfilePage;
