import React, { useEffect } from "react";
import "./card.css";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/Store";
import {
  fetchRandomJoke,
  fetchCategories,
  fetchJokeByCategory,
  clearJokes,
} from "../../store/Slices/jokeSlice";
import CategoryButton from "../CategoryButton/CategoryButton";

const Card: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const randomJoke = useSelector((state: RootState) => state.joke.randomJoke);
  const categoryJoke = useSelector(
    (state: RootState) => state.joke.categoryJoke
  );
  const searchResults = useSelector(
    (state: RootState) => state.joke.searchResults
  );
  const categories = useSelector((state: RootState) => state.joke.categories);

  useEffect(() => {
    dispatch(fetchRandomJoke());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleNewJoke = () => dispatch(fetchRandomJoke());

  const handleCategoryClick = (category: string) => {
    dispatch(clearJokes());
    dispatch(fetchJokeByCategory(category));
  };

  const renderJokeCard = (joke: typeof randomJoke) =>
    joke && (
      <div className="card" key={joke.id}>
        <img src={joke.icon_url} alt="" width="50" height="50" />
        <h2>"{joke.value}"</h2>
      </div>
    );

  return (
    <div className="container">
      {searchResults.length > 0
        ? searchResults.map((joke) => renderJokeCard(joke))
        : categoryJoke
        ? renderJokeCard(categoryJoke)
        : randomJoke
        ? renderJokeCard(randomJoke)
        : null}

      <div className="button-group">
        <CategoryButton label="Random" onClick={handleNewJoke} />
        {categories.slice(0, 5).map((category) => (
          <CategoryButton
            key={category}
            label={category}
            onClick={() => handleCategoryClick(category)}
          />
        ))}
      </div>
    </div>
  );
};

export default Card;
