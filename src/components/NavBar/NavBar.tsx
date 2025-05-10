import React, { useState } from "react";
import "./navbar.css";

const NavBar: React.FC = () => {
  const [searchKeyword, setSearchKeyword] = useState("");

  return (
    <div className="navbar">
      <span>Norris Verse</span>
      <form action="">
        <input
          type="text"
          name=""
          id=""
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          placeholder="Search by keyword"
        />
      </form>
    </div>
  );
};

export default NavBar;
