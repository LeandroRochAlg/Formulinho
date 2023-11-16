import "../../styles/auth/homepage.css";
import Header from "./components/Header";
import Input from "../../components/Input";
import SearchBar from "../../components/SearchBar";
import React, { useState, useRef } from 'react';
import RaceDetails from "./components/RaceDetails";
import Rating from "./components/Rating";
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';


const homePage = () => {
    return (
        <>
        <Header/>
        <div className="main-body">
            <div className="main-search">
                <SearchBar
                    label={""} 
                    placeholder={"Pesquise piloto, pista ou data!"} 
                    type={"text"} 
                    name={"search"}
                    classNm={"search-bar"}
                    />
            </div>
            <div className="content">
                <div className="content-main">
                    <> 
                        <RaceDetails corrida={"https://ergast.com/api/f1/current/last/results.json?limit=1"}/>
                    </>
                    <>
                        <Rating/>
                    </>
                </div>
            </div>
        </div> 
        </>
    );
};

export default homePage;