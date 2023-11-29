import React, { useState, useEffect } from "react";
import "../styles/components/card.css";

const Card = ( ) => {
    const [winner, setWinner] = useState(null);
    const [team, setTeam] = useState(null);
    const [fastestLap, setFastestLap] = useState(null);
    const [place, setPlace] = useState(null);    

    useEffect(() => {
        const corrida = 'https://ergast.com/api/f1/current/last/results.json?limit=1';
        
        fetch(corrida)
        .then(response => response.json())
        .then(data => {
            const race = data.MRData.RaceTable.Races[0];
            setWinner(race.Results[0].Driver);
            setTeam(race.Results[0].Constructor); 
            setFastestLap(race.Results[0].FastestLap.Time);
            setPlace(race.raceName);
        });
    },  
    []);

    return (<>
       <div class="card">
            <div class="img"></div>
            <div class="text">
                <p>VENCEDOR: <span>{winner ? `${winner.givenName} ${winner.familyName}` : " "}</span> </p>
                <p>EQUIPE: <span>{team ? `${team.name}` : " "}</span></p>
                <p>VOLTA MAIS RÁPIDA: <span>{fastestLap ? `${fastestLap.time}` : " "}</span></p>
                <p>LOCAL DA PROVA: <span>{place ? place : " "}</span></p>
                
            </div>
            <div class="rating">    
                <p>★★★★★</p>
            </div>
        </div>
    </>); 
};

export default Card;