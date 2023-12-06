import "../../styles/auth/searchpage.css";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import Filter from "../../components/Filter";
import React, { useState, useEffect } from "react";
import RaceDetails from "./components/RaceDetails";
import Card from "../../components/Card";


const formatarNome = (nome) => {
  const nomeFormatado = nome.replace(/_/g, " ").toUpperCase();
  return nomeFormatado;
};

const SearchPage = () => {
  const years = [];
    for (let year = 2023; year >= 1950; year--) {
      years.push(year);
  }

  const [raceName, setRaceName] = useState([]);
  const [circuitId, setCircuitId] = useState([]);
  const [winners, setWinners] = useState([]);
  const [teams, setTeams] = useState([]);
  const [fastestLaps, setFastestLaps] = useState([]);
  const [places, setPlaces] = useState([]);
  const [selectedRace, setSelectedRace] = useState(null);
  const [selectedYear, setSelectedYear] = useState("");

  const fetchData = async (event) => {
    const selectedYear = event?.target?.value || 2023;

    setSelectedYear(selectedYear);

    const corrida = `https://ergast.com/api/f1/${selectedYear}/results/1.json`;

    const response = await fetch(corrida);
    const data = await response.json();

    const raceNameArray = [];
    const circuitIdArray = [];
    const winnerArray = [];
    const teamArray = [];
    const fastestLapArray = [];
    const placeArray = [];

    data.MRData.RaceTable.Races.forEach((race) => {
      raceNameArray.push(race.raceName);
      circuitIdArray.push(race.Circuit.circuitId);
      winnerArray.push(race.Results[0].Driver.driverId);
      teamArray.push(race.Results[0].Constructor.name);
      if (race.Results[0].FastestLap && race.Results[0].FastestLap.Time) {
        fastestLapArray.push(race.Results[0].FastestLap.Time.time);
      } else {
        fastestLapArray.push("Não Aplicável");
      }
      placeArray.push(race.Circuit.circuitName);
    });

    setRaceName(raceNameArray);
    setCircuitId(circuitIdArray);
    setWinners(winnerArray);
    setTeams(teamArray);
    setFastestLaps(fastestLapArray);
    setPlaces(placeArray);
  };

  const handleCardClick = (race) => {
    setSelectedRace(race);
  };

  const dadosCorrida = winners.map((winner, index) => ({
    raceName: raceName[index],
    circuitId: circuitId[index],
    winners: formatarNome(winner),
    teams: teams[index],
    fastestLaps: fastestLaps[index],
    places: places[index],
  }));

  useEffect(() => {
    fetchData();
  }, []);

  return (
    document.title = "Pesquisar",
    <>
      <Header />
      <div className="main-body">
        <div className="main-search-container">
          <div className="main-search">
            <SearchBar
              label={""}
              placeholder={"Pesquise pela pista!"}
              type={"text"}
              name={"search"}
              classNm={"search-bar"}
            />
            <Filter options={years} onChange={fetchData} />
          </div>

          {dadosCorrida.map((dados, index) => (
            <Card
              raceName={dados.raceName}
              circuitId={dados.circuitId}
              winner={dados.winners}
              team={dados.teams}
              fastestLap={dados.fastestLaps}
              place={dados.places}
              onClick={() => handleCardClick(dados)}
              key={index}
            />
          ))}
        </div>
        <div className="main-content-container">
          <div className="content">
            <div className="content-main">
              <>
                <RaceDetails selectedRace={selectedRace} />
              </>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
