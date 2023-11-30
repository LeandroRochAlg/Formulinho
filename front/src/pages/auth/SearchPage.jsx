import "../../styles/auth/searchpage.css";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import React, { useState, useEffect, useRef } from "react";
import RaceDetails from "./components/RaceDetails";
import Card from "../../components/Card";

const SearchPage = () => {
  const [winners, setWinners] = useState([]);
  const [teams, setTeams] = useState([]);
  const [fastestLaps, setFastestLaps] = useState([]);
  const [places, setPlaces] = useState([]);

  const fetchData = async () => {
    const corrida = "https://ergast.com/api/f1/2023/results.json?limit=1000";

    const response = await fetch(corrida);
    const data = await response.json();
    const winnerArray = [];
    const teamArray = [];
    const fastestLapArray = [];
    const placeArray = [];

    data.MRData.RaceTable.Races.forEach((race) => {
      winnerArray.push(race.Results[0].Driver.driverId);
      teamArray.push(race.Results[0].Constructor.name);
      fastestLapArray.push(race.Results[0].FastestLap.Time.time);
      placeArray.push(race.raceName);
    });

    setWinners(winnerArray);
    setTeams(teamArray);
    setFastestLaps(fastestLapArray);
    setPlaces(placeArray);
  };

  const dadosCorrida = winners.map((winner, index) => ({
    winners: winner,
    teams: teams[index],
    fastestLaps: fastestLaps[index],
    places: places[index],
  }));

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Header />
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

          {dadosCorrida.map((dados, index) => (
            <Card
              winner={dados.winners}
              team={dados.teams}
              fastestLap={dados.fastestLaps}
              place={dados.places}
              key={index}
            />
          ))}
        </div>
        <div className="main-content-container">
          <div className="content">
            <div className="content-main">
              <>
                <RaceDetails
                  corrida={
                    "https://ergast.com/api/f1/current/last/results.json?limit=1"
                  }
                />
              </>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
