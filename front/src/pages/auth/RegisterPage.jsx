import "../../styles/auth/loginpagecss.css";
import { set, useForm } from "react-hook-form";
import api from "../../libs/api";
import { useState } from "react";
import { Link } from "react-router-dom";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const RegisterPage = () => {
  const [msg, setMsg] = useState("");
  const [userCriado, setUserCriado] = useState(false);

  const schema = yup.object({
    username: yup.string().required("Username obrigatório"),
    email: yup.string().email("Email inválido").required("Email obrigatório"),
    password: yup.string().min(4, "Senha precisa ter no mínimo 4 caracteres"),
    confirmPassword: yup
      .string()
      .required("Confirme sua senha")
      .oneOf([yup.ref("password")], "As senhas devem coincidir"),
  });

  const form = useForm({
    resolver: yupResolver(schema),
  });

  const { register, control, handleSubmit, formState, reset } = form;

  const { errors } = formState;

  const submit = async (data) => {
    console.log("Data submitted:", data);

    try {
      const response = await api.post("/create", data);

      if (response.status === 201) {
        setMsg(response.data.message);
        setUserCriado(true);
        reset();
      } else {
        setMsg(response.data.error);
        setUserCriado(false);
      }
    } catch (error) {
      setMsg(error.response.data.error);
      setUserCriado(false);
    }
  };

  return (
    document.title = "Registrar",
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
                {...register("username")}
              />
              <p className="erro">{errors.username?.message}</p>
            </div>
            <div>
              <label>Email:</label>
              <input
                type="text"
                name="email"
                placeholder="hamilton@ex.com"
                {...register("email")}
              />
              <p className="erro">{errors.email?.message}</p>
            </div>
            <div>
              <label>Senha:</label>
              <input
                type="password"
                name="password"
                placeholder="********"
                {...register("password")}
              />
              <p className="erro">{errors.password?.message}</p>
            </div>
            <div>
              <label>Confirme a senha:</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="********"
                {...register("confirmPassword")}
              />
              <p className="erro">{errors.confirmPassword?.message}</p>
            </div>
          </div>
          <div className="form-submit">
            <button>REGISTRAR</button>
            {msg && (
              <div className={userCriado ? "success-message" : "error-message"}>
                <p>{msg}</p>
              </div>
            )}
            <p>
              Já tem conta?
              <Link to={"/login"} className="link">
                {" "}
                Faça login.
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
