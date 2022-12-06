import React from "react";
import { Link } from "react-router-dom";
import logo from "../Assets/Logo.png";
import "../style-sheets/Navbar.css";

export default function Navbar() {
  return (
    <div className="nav-bar">

      <div className="img">
        <Link to="/">
          <img src={logo} width="67.9" height="62.7" alt="img-not-found" />
        </Link>
      </div>

      <div className="toinicio">
        <Link to="/home">
          <h2 className="toiniciot">Inicio</h2>
        </Link>
      </div>

      <div className="tocreate">
        
        <Link to="/activity">
          <h2 className="tocreatet">Crear Actividad</h2>
        </Link>
      </div>

    </div>
  );
}
