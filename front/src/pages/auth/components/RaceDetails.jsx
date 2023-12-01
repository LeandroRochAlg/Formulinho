import "../../../styles/components/racedetails.css";

export default function RaceDetails({ selectedRace }) {
    const { winners, fastestLaps, places, teams } = selectedRace || {};
    
    return (
        <div className="content-container">
            {/* <div className="content-img-container">
                <img className="content-img" src={image}/>
            </div> */}
            <ul className="main-list">
                <li className="list-item">Vencedor: <span>{winners ? `${winners}` : "Carregando..."}</span> </li>
                <li className="list-item">Equipe: <span>{teams ? `${teams}` : "Carregando..."}</span> </li>
                <li className="list-item">Volta mais Rápida: <span> {fastestLaps ? fastestLaps : "Carregando..."} </span></li>
                <li className="list-item">Corrida: <span> {places ? places : "Carregando..."} </span></li>
            </ul>
        </div>

    )
}
