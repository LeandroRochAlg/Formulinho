import "../../../styles/components/racedetails.css";
import { FaRegCircleXmark } from "react-icons/fa6";
import React, { useState } from "react";

export default function RaceDetails({ selectedRace }) {
  const { winners, fastestLaps, places, teams } = selectedRace || {};

  const [rating, setRating] = useState(null);

  const handleRatingChange = (event) => {
    const selectedRating = event.target.value;
    setRating((prevRating) =>
      prevRating === selectedRating ? null : selectedRating,
    );
  };

  const handleResetRating = () => {
    setRating(null);
    console.log("Rating reset");
  };

  return (
    <div className="content-container">
      {/* <div className="content-img-container">
                <img className="content-img" src={image}/>
            </div> */}
      <ul className="main-list">
        <li className="list-item">
          Vencedor:{" "}
          <span>{winners ? `${winners}` : "Selecione uma corrida"}</span>{" "}
        </li>
        <li className="list-item">
          Equipe: <span>{teams ? `${teams}` : "Selecione uma corrida"}</span>{" "}
        </li>
        <li className="list-item">
          Volta mais Rápida:{" "}
          <span> {fastestLaps ? fastestLaps : "Selecione uma corrida"} </span>
        </li>
        <li className="list-item">
          Corrida: <span> {places ? places : "Selecione uma corrida"} </span>
        </li>
      </ul>
      <div className="star-rating">
        <input
          type="radio"
          id="star1"
          name="rating"
          value="1"
          checked={rating === "1"}
          onChange={handleRatingChange}
        />
        <label htmlFor="star1">&#9733;</label>
        <input
          type="radio"
          id="star2"
          name="rating"
          value="2"
          checked={rating === "2"}
          onChange={handleRatingChange}
        />
        <label htmlFor="star2">&#9733;</label>
        <input
          type="radio"
          id="star3"
          name="rating"
          value="3"
          checked={rating === "3"}
          onChange={handleRatingChange}
        />
        <label htmlFor="star3">&#9733;</label>
        <input
          type="radio"
          id="star4"
          name="rating"
          value="4"
          checked={rating === "4"}
          onChange={handleRatingChange}
        />
        <label htmlFor="star4">&#9733;</label>
        <input
          type="radio"
          id="star5"
          name="rating"
          value="5"
          checked={rating === "5"}
          onChange={handleRatingChange}
        />
        <label htmlFor="star5">&#9733;</label>
      </div>
      {rating !== null && (
        <button className="reset-button" onClick={handleResetRating}>
          <FaRegCircleXmark style={{ fontSize: "1.2rem", color: "white" }} />
        </button>
      )}
    </div>
  );
}
