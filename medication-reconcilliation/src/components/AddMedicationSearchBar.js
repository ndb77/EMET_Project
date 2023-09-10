import React from "react";
import { useState } from "react";

// Recieves the API results from the NLM API call from the parent and renders them into the dropdown menu
// Sends keystrokes made in the text box to be queried by the NLM API made by the parent
// **A problem currently exists where the dropdown menu shows up in an incorrect spot when viewed on mobile**
const AddMedicationSearchBar = ({
  search,
  setSearch,
  setSearchResult,
  searchResult,
  setMedicationName,
  setStrength,
}) => {
  const [clicked, setClicked] = useState(false);
  return (
    <div className="searchBar">
      <div className="input-wrapper">
        <img></img>
        <input
          placeholder="Drug Name"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setClicked(false);
          }}
        ></input>
      </div>
      <div
        className="results-list"
        style={{ display: clicked ? "none" : "flex" }}
      >
        {searchResult
          ? searchResult.map((result, id) => {
              return (
                <div
                  className="search-result"
                  key={id}
                  // resetting the search result list
                  onClick={(e) => {
                    setSearch(e.target.innerText);
                    setMedicationName(e.target.innerText);
                    setSearchResult([]);
                    setStrength("");
                    setClicked(true);
                  }}
                >
                  {result}
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default AddMedicationSearchBar;
