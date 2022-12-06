import React from "react";
import "../style-sheets/Card.css";

export default function Card({ flag, name, continent }) {
  return (
    <div className="cardcontainer">
      <div className="flagimg">
        <img src={flag} className="flag" alt="img not found" />
      </div>

      
        <div className="name">
          <h2>{name}</h2>
        </div>
        <div className="continent">
          <p >{continent}</p>
        </div>
      
    </div>
  );
}
