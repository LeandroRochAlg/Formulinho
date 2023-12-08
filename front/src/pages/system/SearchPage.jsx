import "../../styles/system/searchpage.css";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import Filter from "../../components/Filter";
import React, { useState, useEffect } from "react";
import RaceDetails from "../auth/components/RaceDetails";
import Card from "../../components/Card";
import api from "../../libs/api";
import { set } from "react-hook-form";

const SearchPage = () => {
  const years = [];
  for (let year = 2023; year >= 1950; year--) {
    years.push(year);
  }

  const [selectedRating, setSelectedRating] = useState(null);
  const [raceName, setRaceName] = useState([]);
  const [circuitId, setCircuitId] = useState([]);
  const [winners, setWinners] = useState([]);
  const [teams, setTeams] = useState([]);
  const [fastestLaps, setFastestLaps] = useState([]);
  const [places, setPlaces] = useState([]);
  const [localities, setLocalities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [mediaEstrelas, setMediaEstrelas] = useState(null);
  const [selectedRace, setSelectedRace] = useState(null);
  const [selectedYear, setSelectedYear] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [Rounds, setRounds] = useState("");

  // Função para encontrar a volta mais rápida da corrida
  const voltaMaisRapida = (results) => {
    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      try {
        if (result.FastestLap.rank === '1') {
          
          return `${result.FastestLap.Time.time} - ${formatarNome(result.Driver.driverId)}`;
        }
      } catch (error) {
        return "Não Aplicável";
      }
    }
    return "Não Aplicável";
  }

  // Pegar a avaliação da corrida passada por parâmetro e enviar para o backend
  const getRatingFromBackend = async (ano, round) => {
    const data = {
      ano: ano,
      round: round
    }

    api.get(`/avaliacoes`, data).then((response) => {
      setMediaEstrelas(response.data.media);
    }).catch((error) => {
      console.error('Error during getRatingFromBackend:', error);
    });
  };

  const sendRatingToBackend = async (ano, round, avaliacao) => {
    const data = {
      ano: ano,
      round: round,
      avaliacao: avaliacao
    }

    api.post(`/avaliar`, data).then((response) => {
      console.log(response.data);
    }).catch((error) => {
      console.error('Error during sendRatingToBackend:', error);
    });
  };

  const formatarNome = (nome) => {
    const nomeFormatado = nome.replace(/_/g, " ").toUpperCase();
    return nomeFormatado;
  };

  const fetchData = async (event) => {
    const selectedYear = event?.target?.value || 2023;
    setSelectedYear(selectedYear);

    const corrida = `https://ergast.com/api/f1/${selectedYear}/results.json?limit=1000`;

    const response = await fetch(corrida);
    const data = await response.json();

    const circuitIdArray = [];
    const roundArray = [];
    const winnerArray = [];
    const teamArray = [];
    const fastestLapArray = [];
    const placeArray = [];
    const localityArray = [];
    const countryArray = [];
    const raceNameArray = [];
    const mediaEstrelasArray = [];
    

    data.MRData.RaceTable.Races.forEach((race) => {
      circuitIdArray.push(race.Circuit.circuitId);
      winnerArray.push(race.Results[0].Driver.driverId);
      teamArray.push(race.Results[0].Constructor.name);
      placeArray.push(race.Circuit.circuitName);
      countryArray.push(race.Circuit.Location.country);
      raceNameArray.push(race.raceName);
      localityArray.push(race.Circuit.Location.locality);
      roundArray.push(race.round);
      if (race.Results[0].FastestLap && race.Results[0].FastestLap.Time) {
        fastestLapArray.push(voltaMaisRapida(race.Results));
      } else {
        fastestLapArray.push("Não Aplicável");
      }
      //mediaEstrelasArray.push(getRatingFromBackend(race.season, race.round));
    });
    setRaceName(raceNameArray);
    setCircuitId(circuitIdArray);
    setWinners(winnerArray);
    setTeams(teamArray);
    setFastestLaps(fastestLapArray);
    setPlaces(placeArray);
    setLocalities(localityArray);
    setCountries(countryArray);
    setRounds(roundArray);
    //setMediaEstrelas(mediaEstrelasArray);
  };

  const updateRating = (rating, round) => {
    setSelectedRating(rating);
    sendRatingToBackend(selectedYear, round, rating);
  };

  const handleCardClick = (race) => {
    setSelectedRace(race);
  };

  const dadosCorrida = winners.map((winner, index) => ({
    circuitId: circuitId[index],
    round: Rounds[index],
    winners: formatarNome(winner),
    teams: teams[index],
    fastestLaps: fastestLaps[index],
    places: places[index],
    locality: localities[index],
    country: countries[index],
    raceName: raceName[index],
    // mediaEstrelas: mediaEstrelas[index],
  }));

  useEffect(() => {
    fetchData();
    const ano = 2023;
    const round = 1;
    getRatingFromBackend(ano, round);
  }, []);

  console.log("Avaliação: ", mediaEstrelas);
 
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
                raceRound={dados.round}
                circuitId={dados.circuitId}
                winner={dados.winners}
                team={dados.teams}
                fastestLap={dados.fastestLaps}
                place={dados.places}
                mediaEstrelas={dados.mediaEstrelas}
                onClick={() => handleCardClick(dados)}
                key={index}
              />
            ))}
          </div>
          <div className="main-content-container">
            <div className="content">
              <div className="content-main">
                <>
                  <RaceDetails
                    selectedRace={selectedRace}
                    onUpdateRating={updateRating}
                  />
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
