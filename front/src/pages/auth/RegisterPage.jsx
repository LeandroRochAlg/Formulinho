import "../../styles/auth/loginpagecss.css";
import ButtonComponent from "../../components/ButtonComponent";
import Input from "../../components/Input";
import {set, useForm} from 'react-hook-form';
import axios, * as others from 'axios';
import { useState } from 'react';
import {Link} from "react-router-dom";
import {motion as m} from "framer-motion";

const RegisterPage = () => {

    const [msg, setMsg] = useState();
    const [userCriado,setUserCriado] = useState(false);
    const form = useForm();

    const { register, control, handleSubmit, formState } = form;

    const {errors} = formState;

    const submit = async (data) => {
        
        try {
            const response = await axios.post('http://localhost:3000/create', data);
            setMsg(response.data);
            if(response.data.includes('sucesso'))
                setUserCriado(true);
        } catch (error) {
            setMsg(error.response.data);
        }   
    
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
                    <Input label={"Username:"} type={"text"} name={"name"} placeholder={"hamilton44"} {...register('username')} />
                    <Input label={"Email:"} type={"text"} name={"email"} placeholder={"hamilton@ex.com"}  {...register('email')}/>
                    <Input label={"Password:"} type={"password"} name={"password"} placeholder={"∗∗∗∗∗∗∗∗"}{...register('password')}/>
                    <Input label={"Confirm Password:"} type={"password"} name={"confirmPassword"} placeholder={"∗∗∗∗∗∗∗∗"} {...register('confirmpassword')}/>
                </div>
                    <div className="form-submit">
                        <ButtonComponent text={"REGISTER"}/>
                    <p>Já tem conta? 
                        <Link to={'/login'} className="link"> Faça login.</Link> 
                    </p>
                </div>
                </form>
            </m.div>
        </div>
    );
};

export default RegisterPage;