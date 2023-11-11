import "../../styles/auth/loginpagecss.css";
import ButtonComponent from "../../components/ButtonComponent";
import Input from "../../components/Input";
import {Link} from "react-router-dom";
import {motion as m} from "framer-motion";

const RegisterPage = () => {
    return (
        <div className="page-body" style={{position:'absolute'}}>
            <m.div 
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ opacity: 1 }}
            transition={{ duration: 0.75, ease: "easeOut" }}  
            className="form-container"
            >
                <div className="form-header">
                    <a href='/'> 
                        <img id="f1" src="https://account.formula1.com/images/f1_logo.svg" data-i18n="[alt]nav.logo" alt="Formula1"/>
                    </a>
                </div>
                <div className="form-field">
                    <Input label={"Username:"} type={"text"} name={"name"} placeholder={"hamilton44"} />
                    <Input label={"Email:"} type={"text"} name={"email"} placeholder={"hamilton@ex.com"} />
                    <Input label={"Password:"} type={"password"} name={"password"} placeholder={"*********"} />
                    <Input label={"Confirm Password:"} type={"password"} name={"confirmPassword"} placeholder={"*********"} />
                </div>
                <div className="form-submit">
                    <ButtonComponent text={"REGISTER"}/>
                    <p>Já tem conta? 
                        <Link to={'/login'} className="link"> Faça login.</Link> 
                    </p>
                </div>
            </m.div>
        </div>
    );
};

export default RegisterPage;