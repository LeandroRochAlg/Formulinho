import "../../styles/auth/searchpage.css";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import React, { useState, useRef } from 'react';
import RaceDetails from "./components/RaceDetails";
import Card from "../../components/card";

const SearchPage = () => {

    const i = 5;

    return (
        <>
        <Header/>
        <div className="main-body">
            <div className="main-search-container">
                <div className="main-search">
                    <SearchBar
                        label={""} 
                        placeholder={"Pesquise piloto, pista ou equipe!"} 
                        type={"text"} 
                        name={"search"}
                        classNm={"search-bar"}
                        />
                </div>
                {Array(i).fill().map((_, index) => (
                        <Card key={index} />
                    ))}
        </div>
        <div className="main-content-container">
                <div className="content">
                    <div className="content-main">
                        <> 
                            <RaceDetails corrida={"https://ergast.com/api/f1/current/last/results.json?limit=1"}/>
                        </>
                    </div>
                </div>
            </div>
        </div>  
        
        </>
    );
};

export default SearchPage;