import "../../styles/auth/loginpagecss.css";
import ButtonComponent from "../../components/ButtonComponent";
import Input from "../../components/Input";
import {Link, Navigate} from "react-router-dom";
import {useForm} from 'react-hook-form';
import axios, * as others from 'axios';
import { useState } from 'react';
import {motion as m} from "framer-motion";

const loginPage = () => {
  
  const [msg, setMsg] = useState(' ');

    const form = useForm();

    const { register, handleSubmit, formState } = form;

    const {errors} = formState;

    const submit = async (data) => {
        
        try {
            const response = await axios.post('http://localhost:3000/login', data);
            setMsg(response.data);
        } catch (error) {
            setMsg(error.response.data);
        }   
        
    }

    if(msg.includes('Autenticado')){
        return <Navigate to='/disciplinas' />
    }


  return (
      <div className="page-body">
        <m.div 
          initial={{ x: "100%" }}
          animate={{ x: "0%" }}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }} 
          className="form-container"
          >
          <div className="form-header">
            <a href='/'> 
              <img id="f1" src="https://account.formula1.com/images/f1_logo.svg" data-i18n="[alt]nav.logo" alt="Formula1"/>
            </a>
          </div>
          <form onSubmit={handleSubmit(submit)} noValidate>
            <div className="form-field">
              <Input label={"Email:"} type={"text"} name={"email"} placeholder={"hamilton@ex.com"} {...register('email')} />
              <Input label={"Password:"} type={"password"} name={"password"} placeholder={"*********"} {...register('password')} />
            </div>
            <div className="form-submit">
              <ButtonComponent text={"LOGIN"}/>
              <p>Não tem conta? 
                <Link to={'/register'} className="link"> Registre-se.</Link> 
              </p>
            </div>
          </form>
      </m.div>
    </div>
  );
};

export default loginPage;