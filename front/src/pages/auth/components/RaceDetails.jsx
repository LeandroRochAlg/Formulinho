import { useEffect, useState } from "react";
import "../../../styles/components/racedetails.css";



export default function Disciplina({corrida}){

    const [winner, setWinner] = useState(null);
    const [time, setTime] = useState(null);
    const [place, setPlace] = useState(null);
    const [team, setTeam] = useState(null);
    const [image, setImage] = useState(null);

    useEffect(() => {
        fetch(corrida)
            .then(response => response.json())
            .then(data => {
                const race = data.MRData.RaceTable.Races[0];
                setWinner(race.Results[0].Driver);
                setTime(race.Results[0].Time.time);
                setPlace(race.raceName);
                setTeam(race.Results[0].Constructor);
            });
    }, []);


    
    return (
        <div className="content-container">
            <div className="content-img-container">
                <img className="content-img" src={image}/>
            </div>
            <ul className="main-list">
                <li className="list-item">Vencedor: <span>{winner ? `${winner.givenName} ${winner.familyName}` : "Carregando..."}</span> </li>
                <li className="list-item">Equipe: <span>{team ? `${team.name}` : "Carregando..."}</span> </li>
                <li className="list-item">Corrida: <span> {place ? place : "Carregando..."} </span></li>
                <li className="list-item">Tempo de Prova: <span> {time ? time : "Carregando..."} </span></li>
            </ul>
        </div>

    )
}