import "../styles/components/card.css";

const Card = ({ winner, team, fastestLap, place, onClick }) => {
  return (
    <>
      <div className="card" onClick={onClick}>
        <div className="img"></div>
        <div className="text">
          <ul className="card-list">
            <li>
              <p className="card-text">
                VENCEDOR: <span className="card-span">{winner}</span>{" "}
              </p>
            </li>
            <li>
              <p className="card-text">
                EQUIPE:{" "}
                <span className="card-span">{team}</span>
              </p>
            </li>
            <li>
              <p className="card-text">
                VOLTA MAIS RÁPIDA:{" "}
                <span className="card-span">
                  {fastestLap}
                </span>
              </p>
            </li>
            <li>
              <p className="card-text">
                LOCAL DA PROVA:{" "}
                <span className="card-span">{place}</span>
              </p>
            </li>
          </ul>
        </div>
        <div className="rating">
          <p>★★★★★</p>
        </div>
      </div>
    </>
  );
};

export default Card;
