import React, { useEffect } from "react";
import "./card.css";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/Store";
import { fetchJokes } from "../../store/Slices/jokeSlice";

const Card: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const jk = useSelector((state: RootState) => state.joke.jokes);

  useEffect(() => {
    dispatch(fetchJokes());
  }, [dispatch]);

  const handleJokes = () => {
    dispatch(fetchJokes());
  };

  return (
    <div className="container">
      {jk?.map((joke) => (
        <div className="card" key={joke.id}>
          <img
            src={joke.icon_url}
            alt=""
            style={{ width: "50px", height: "50px" }}
          />
          <h2>"{joke.value}"</h2>
          <button onClick={handleJokes}>New Joke</button>
        </div>
      ))}
    </div>
  );
};

export default Card;
