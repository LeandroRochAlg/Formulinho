import "../../../styles/components/racedetails.css";

export default function Disciplina({corrida}){

    return (
        <ul className="main-list">
            <li className="list-item">Piloto do dia: </li>
            <li className="list-item">Local: </li>
            <li className="list-item">Duração: </li>
            <li className="list-item">Vencedor: </li>
        </ul>
    )
}