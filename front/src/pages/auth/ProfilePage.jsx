import React from "react";
import Header from "../../components/Header";
import { useState } from "react";
import "../../styles/auth/profilecss.css";

const ProfilePage = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Header />
      <div className="profile-body">
        <div className="button-grid">
          <section>
            <form>
              <h2>Alterar Nome</h2>
              <p>Alterar informações básicas do perfil</p>
              <input type="text" placeholder="Usuário" />
              <input type="email" placeholder="Email" />
              <button>Atualizar</button>
            </form>
          </section>
          <section>
            <form>
              <h2>Alterar Senha</h2>
              <p>Certifique-se que está escolhendo uma senha segura</p>
              <input type="password" placeholder="Nova senha" />
              <input type="password" placeholder="Senha" />
              <input type="password" placeholder="Confirme Senha" />
              <button>Atualizar</button>
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
          </section>
        </div>
      </div>
      {open ? (
        <div className="float" style={{ display: "absolute" }}>
          <grid className="modal">
            <h2>Tem certeza que deseja excluir sua conta?</h2>
            <p>Todos os seus dados serão apagados e não será possível recuperá-los novamente.</p>
            <button id="delete">Confirmar</button>
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