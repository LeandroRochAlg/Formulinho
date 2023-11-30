import "../../styles/auth/loginpagecss.css";
import {set, useForm} from 'react-hook-form';
import api from '../../libs/api';
import { useState } from 'react';
import {Link} from "react-router-dom";

const RegisterPage = () => {

    const [msg, setMsg] = useState('');
    const [userCriado,setUserCriado] = useState(false);
    const form = useForm();

    const { register, control, handleSubmit, formState } = form;

    const {errors} = formState;

    const submit = async (data) => {

        console.log('Data submitted:', data);
        
        try {
            const response = await api.post('/create', data);
            setMsg(response.data);
            if (response.status === 201) {
                setMsg('Successfully created!');
                setUserCriado(true);
            }else {
                // Handle other status codes if needed
                setMsg(response.data);
            }
            } catch (error) {
            setMsg(error.response.data);
        }   
    
    }


    return (        
        <div className="page-body">
            <div className="form-container">
                <div className="form-header">
                    <a href='/'> 
                        <img id="f1" src="https://account.formula1.com/images/f1_logo.svg" data-i18n="[alt]nav.logo" alt="Formula1"/>
                    </a>
                </div>
                <form onSubmit={handleSubmit(submit)} noValidate>
                    <div className="form-field">
                        <div>
                            <label>Username:</label>
                            <input type="text" name="username" placeholder="hamilton44" {...register('username')} />
                        </div>
                        <div>
                            <label>Email:</label>
                            <input type="text" name="email" placeholder="hamilton@ex.com" {...register('email')} />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input type="password" name="password" placeholder="********" {...register('password')} />
                        </div>
                        <div>
                            <label>Confirm Password:</label>
                            <input type="password" name="confirmPassword" placeholder="********" {...register('confirmPassword')} />
                        </div>
                    </div>
                    <div className="form-submit">
                        <button>REGISTER</button>
                        <p>Já tem conta?
                            <Link to={'/login'} className="link"> Faça login.</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;