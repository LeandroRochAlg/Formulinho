import React from "react";
import Header from "../../components/Header";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import api from "../../libs/api";

import "../../styles/system/profilecss.css";

const ProfilePage = () => {
  const [open, setOpen] = useState(false);

  const nav = useNavigate();

  const [msg, setMsg] = useState(" ");

  const form = useForm();

  const { register, handleSubmit, formState } = form;

  const { errors } = formState;

  const submit = async (data) => {
    console.log("Data submitted:", data);

    try {
      const response = await api.put("/users", data);
      setMsg(response.data);
      localStorage.setItem("token", response.data.token);
      nav("/system/search");
    } catch (error) {
      setMsg(error.response.data.error);
    }
  };

  return (
    <>
      <Header />
      <div className="profile-body">
        <div className="button-grid">
          <section>
            <form onSubmit={handleSubmit(submit)}>
              <h2>Alterar Nome</h2>
              <p>Alterar informações básicas do perfil</p>
              <input
                type="text"
                name="username"
                placeholder="Usuário"
                {...register("username")}
              />
              {errors.username && <p>{errors.username.message}</p>}
              <input type="email" placeholder="Email" {...register("email")} />
              {errors.username && <p>{errors.username.message}</p>}
              <button>Atualizar</button>
              {msg && (
                <div className="error-message">
                  <p>{msg}</p>
                </div>
              )}
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
            <p>
              Todos os seus dados serão apagados e não será possível
              recuperá-los novamente.
            </p>
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
