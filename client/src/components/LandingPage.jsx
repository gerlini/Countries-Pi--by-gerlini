import React from "react";
import { Link } from "react-router-dom";
import "../style-sheets/LandingPage.css";

export default function LandingPage() {
  return (
    <div className="Landing">
      <div className="TextandButton">
        <div>
          <p className="Maintext">Proyecto Individual</p>
          <p className="Maintext2">Henry Countries</p>
          <p className="Secondtext">Descubre Paises de todo el mundo.</p>
          <div className="btncointainer">
          <Link to = "/home">
            <button className="joinbtn">Ingresar</button>
          </Link>
        </div>
        </div>

        
      </div>
      
    </div>
  );
}
