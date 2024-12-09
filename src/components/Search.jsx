import { useState } from "react";
import './Search.css';

export default function Search({ action }) {
  const [term, setTerm] = useState("");

  function submit(e) {
    e.preventDefault();
    action(term);
    setTerm("");
  }

  return (
    <form onSubmit={submit}>
      <div className="fx fx-gap">
        <div>
          <input
          type="text"
          placeholder="Search for song or artist"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        </div>
        <div id="search-icon">
          <button id="search-button" type="submit">
            <div id="search-icon-circle"></div>
            <span></span>
          </button>
        </div>
      </div>
      
    </form>
  );
}