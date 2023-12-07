import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import "../../styles/auth/homescreencss.css";

const HomePage = () => {
  const [lastRaceInfo, setLastRaceInfo] = useState(null);
  const [winner, setWinner] = useState(null);
  const [time, setTime] = useState(null);
  const [place, setPlace] = useState(null);
  const [team, setTeam] = useState(null);


  useEffect(() => {
    const corrida =
      "https://ergast.com/api/f1/current/last/results.json?limit=1";
    fetch(corrida)
      .then((response) => response.json())
      .then((data) => {
        const race = data.MRData.RaceTable.Races[0];
        setWinner(race.Results[0].Driver);
        setTime(race.Results[0].Time.time);
        setPlace(race.raceName);
        setTeam(race.Results[0].Constructor);
      });
  }, []);

  return (
    (document.title = "Pagina Inicial"),
    (
      <>
        <Header />
        <div className="home-body">
          <h1 className="f1">formula 1</h1>
          <p className="last-race">ultima corrida:</p>
          <h2 className="place">
            <span className="place"> {place ? place : "Carregando..."} </span>{" "}
          </h2>
          <p className="winner">
            <span className="winner">
              {winner
                ? `${winner.givenName} ${winner.familyName}`
                : "Carregando..."}
            </span>{" "}
          </p>
          <p className="team">
            <span className="team">
              {team ? `${team.name}` : "Carregando..."}
            </span>
          </p>
        </div>
      </>
    )
  );
};

export default HomePage;
