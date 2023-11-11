import "../../styles/auth/homepage.css";
import Header from "./components/Header";
import Input from "../../components/Input";
import React, { useState } from 'react';

const homePage = () => {
    return (
        <>
        <Header/>
        <div className="main-body">
            <div className="main-search">
                <Input label={""} placeholder={"Pesquise piloto, pista ou data!"} type={"text"} name={"search"}/>
            </div>
            <div className="content">
                <div className="content-main">
                    <div className="content-img-container">
                        <img className="content-img" src="https://media.formula1.com/image/upload/t_16by9Centre/f_auto/q_auto/v1699540981/fom-website/2023/United%20States%20(Austin)/GettyImages-1739561537.jpg.transform/9col/image.jpg" alt="Lewis Hamilton"/>
                    </div>
                </div>
            </div>
        </div> 
        </>
    );
};

export default homePage;