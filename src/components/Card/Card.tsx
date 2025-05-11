import React, { useEffect } from "react";
import "./card.css";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/Store";
import { fetchRandomJoke } from "../../store/Slices/jokeSlice";

const Card: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const randomJoke = useSelector((state: RootState) => state.joke.randomJoke);

  useEffect(() => {
    dispatch(fetchRandomJoke());
  }, [dispatch]);

  const handleJokes = () => {
    dispatch(fetchRandomJoke());
  };

  return (
    <div className="container">
      {randomJoke && (
        <div className="card" key={randomJoke.id}>
          <img
            src={randomJoke.icon_url}
            alt=""
            style={{ width: "50px", height: "50px" }}
          />
          <h2>"{randomJoke.value}"</h2>
          <button onClick={handleJokes}>New Joke</button>
        </div>
      )}
    </div>
  );
};

export default Card;
