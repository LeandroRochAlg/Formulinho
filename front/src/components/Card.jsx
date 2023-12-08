import "../styles/components/card.css";

const Card = ({
  raceName,
  raceRound,
  circuitId,
  winner,
  team,
  fastestLap,
  place,
  mediaEstrelas,
  onClick,
}) => {
  return (
    <>
      <div className="card" onClick={onClick}>
        <div className="img">
          <img
            src={`../img/corridas/${circuitId}.jpg`}
            alt="Imagem do circuito"
          />
        </div>
        <div className="text">
          <ul className="card-list">
            <li>
              <p className="race-name">
                <span>{raceName}</span>{" "}
              </p>
            </li>
            <li>
              <p className="card-text">
                VENCEDOR: <span className="card-span">{winner}</span>{" "}
              </p>
            </li>
            <li>
              <p className="card-text">
                EQUIPE: <span className="card-span">{team}</span>
              </p>
            </li>
            <li>
              <p className="card-text">
                VOLTA MAIS RÁPIDA:{" "}
                <span className="card-span">{fastestLap}</span>
              </p>
            </li>
            <li>
              <p className="card-text">
                LOCAL DA PROVA: <span className="card-span">{place}</span>
              </p>
            </li>
            <li style={{display:"none"}}>
              <p className="card-text">
                RODADA: <span className="card-span">{raceRound}</span>
              </p>
            </li>
          </ul>
        </div>
        <div className="rating">
          <p className="rating-text">Avaliação: {mediaEstrelas}</p>
        </div>
      </div>
    </>
  );
};

export default Card;
