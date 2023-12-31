import "../../styles/auth/loginpagecss.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from "../../libs/api";
import { useState } from "react";

const loginPage = () => {
  const nav = useNavigate();

  const [msg, setMsg] = useState(" ");

  const form = useForm();

  const { register, handleSubmit, formState } = form;

  const { errors } = formState;

  const submit = async (data) => {
    console.log("Data submitted:", data);

    try {
      const response = await api.post("/login", data);
      setMsg(response.data);
      localStorage.setItem("token", response.data.token);
      nav("/system/search");
    } catch (error) {
      setMsg(error.response.data.error);
    }
  };

  return (
    (document.title = "Entrar"),
    (
      <div className="page-body">
        <div className="form-container">
          <div className="form-header">
            <a href="/">
              <img
                id="f1"
                src="https://account.formula1.com/images/f1_logo.svg"
                data-i18n="[alt]nav.logo"
                alt="Formula1"
              />
            </a>
          </div>
          <form onSubmit={handleSubmit(submit)} noValidate>
            <div className="form-field">
              <div>
                <label>Usuário:</label>
                <input
                  type="text"
                  name="username"
                  placeholder="hamilton44"
                  {...register("username", {
                    required: "Usuário é necessário",
                  })}
                />
                {errors.username && <p>{errors.username.message}</p>}
              </div>
              <div>
                <label>Senha:</label>
                <input
                  type="password"
                  name="password"
                  placeholder="********"
                  {...register("password", { required: "Senha é necessária" })}
                />
                {errors.password && <p>{errors.password.message}</p>}
              </div>
            </div>
            <div className="form-submit">
              <button>ENTRAR</button>
              {msg && (
                <div className="error-message">
                  <p>{msg}</p>
                </div>
              )}
              <p>
                Não tem conta?
                <Link to={"/auth/register"} className="link">
                  {" "}
                  Registre-se.
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default loginPage;
