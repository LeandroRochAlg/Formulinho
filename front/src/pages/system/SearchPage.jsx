import "../../styles/auth/searchpage.css";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import Filter from "../../components/Filter";
import React, { useState, useEffect } from "react";
import RaceDetails from "../auth/components/RaceDetails";
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
  const [localities, setLocalities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedRace, setSelectedRace] = useState(null);
  const [selectedYear, setSelectedYear] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const fetchData = async (event) => {
    const selectedYear = event?.target?.value || 2023;
    setSelectedYear(selectedYear);

    const corrida = `https://ergast.com/api/f1/${selectedYear}/results/1.json`;

    const response = await fetch(corrida);
    const data = await response.json();

    const circuitIdArray = [];
    const winnerArray = [];
    const teamArray = [];
    const fastestLapArray = [];
    const placeArray = [];
    const localityArray = [];
    const countryArray = [];
    const raceNameArray = [];

    data.MRData.RaceTable.Races.forEach((race) => {
      circuitIdArray.push(race.Circuit.circuitId);
      winnerArray.push(race.Results[0].Driver.driverId);
      teamArray.push(race.Results[0].Constructor.name);
      placeArray.push(race.Circuit.circuitName);
      countryArray.push(race.Circuit.Location.country);
      raceNameArray.push(race.raceName);
      localityArray.push(race.Circuit.Location.locality);
      if (race.Results[0].FastestLap && race.Results[0].FastestLap.Time) {
        fastestLapArray.push(race.Results[0].FastestLap.Time.time);
      } else {
        fastestLapArray.push("Não Aplicável");
      }
    });
    setRaceName(raceNameArray);
    setCircuitId(circuitIdArray);
    setWinners(winnerArray);
    setTeams(teamArray);
    setFastestLaps(fastestLapArray);
    setPlaces(placeArray);
    setLocalities(localityArray);
    setCountries(countryArray);
  };

  const handleCardClick = (race) => {
    setSelectedRace(race);
  };

  const dadosCorrida = winners.map((winner, index) => ({
    circuitId: circuitId[index],
    winners: formatarNome(winner),
    teams: teams[index],
    fastestLaps: fastestLaps[index],
    places: places[index],
    locality: localities[index],
    country: countries[index],
    raceName: raceName[index],
  }));

  useEffect(() => {
    fetchData();
  }, []);

  console.log(selectedYear);
  const filteredData = searchValue
    ? dadosCorrida.filter(
        (dados) =>
          dados.circuitId.toLowerCase().includes(searchValue.toLowerCase()) ||
          (dados.country &&
            dados.country.toLowerCase().includes(searchValue.toLowerCase())) ||
          (dados.locality &&
            dados.locality.toLowerCase().includes(searchValue.toLowerCase())) ||
          (dados.places &&
            dados.places.toLowerCase().includes(searchValue.toLowerCase())),
      )
    : dadosCorrida;

  return (
    (document.title = "Pesquisar"),
    (
      <>
        <Header />
        <div className="main-body">
          <div className="main-search-container">
            <div className="main-search">
              <SearchBar
                label={""}
                placeholder={"Pesquise pela pista, local ou país"}
                type={"text"}
                name={"search"}
                classNm={"search-bar"}
                onSearch={(value) => setSearchValue(value)}
              />
              <Filter options={years} onChange={fetchData} />
            </div>

            {filteredData.map((dados, index) => (
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
    )
  );
};

export default SearchPage;
