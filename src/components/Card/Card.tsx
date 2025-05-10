import React from "react";
import "./card.css";

const Card: React.FC = () => {
  return (
    <div className="container">
      <div className="card">
        <h2>
          "Fort Knox wanted to store gold in Chuck Norris' beard - but Chuck
          Norris' beard makes gold rust."
        </h2>
        <button>New Joke</button>
      </div>
    </div>
  );
};

export default Card;
