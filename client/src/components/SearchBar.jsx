import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameCountries, getCountries } from "../actions";
import reload from "../Assets/reloadicon.png"
import clean from "../Assets/xicon.png"
import "../style-sheets/SearchBar.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleClick(e) {
    e.preventDefault();
    dispatch(getCountries());
  }

  function handleChange(e) {
    e.preventDefault();
    setName(e.target.value);
    dispatch(getNameCountries(name));
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getNameCountries(""));
    setName("");
  }

  return (
    <div className="container">
      <div className="container-reload">
        <button
        className="btn-reload"
          onClick={(e) => {
            handleClick(e);
          }}
        >
         <img src={reload} 
         alt="not found"
         width="35px"
         height="35px" />
        </button>
      </div>
      <input
        className="imputext"
        type="text"
        value={name}
        placeholder="                    Pais...         "
        onChange={(e) => handleChange(e)}
      />
      <div className="container-clean">
        <button
          className="btn-clean"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
         <img src={clean} 
         alt="clean"
         width="30px"
         height="39px" />
        </button>
      </div>

      
    </div>
  );
}
