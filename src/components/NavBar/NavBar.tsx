import React, { useState } from "react";
import "./navbar.css";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/Store";
import { searchJokes } from "../../store/Slices/jokeSlice";

const NavBar: React.FC = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      dispatch(searchJokes(searchKeyword));
    }
  };

  return (
    <div className="navbar">
      <span>Norris Verse</span>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name=""
          id=""
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          placeholder="Search by keyword....."
        />
      </form>
    </div>
  );
};

export default NavBar;
