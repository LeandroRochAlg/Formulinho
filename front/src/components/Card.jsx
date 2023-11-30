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
       <div className="card">
            <div className="img"></div>
            <div className="text">
                <ul className="card-list">
                    <li><p className="card-text">VENCEDOR: <span className ="card-span">{winner ? `${winner.givenName} ${winner.familyName}` : " "}</span> </p></li>
                    <li><p className="card-text">EQUIPE: <span className ="card-span">{team ? `${team.name}` : " "}</span></p></li>
                    <li><p className="card-text">VOLTA MAIS RÁPIDA: <span className ="card-span">{fastestLap ? `${fastestLap.time}` : " "}</span></p></li>
                    <li><p className="card-text">LOCAL DA PROVA: <span className ="card-span">{place ? place : " "}</span></p></li>
                </ul>
            </div>
            <div className="rating">    
                <p>★★★★★</p>
            </div>
        </div>
    </>); 
};

export default Card;