import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCountries,
  getActivities,
  orderByName,
  orderByPopulation,
  filterByContinent,
  filterByActivities,
} from "../actions";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import Card from "./Card";
import Paginate from "./Paginate";
import Navbar from "./Navbar";

import "../style-sheets/Home.css";
export default function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);
  const activities = useSelector((state) => state.activities);
  let [currentPage, setCurrentPage] = useState(1); //Siempre va a empezar en la pagina uno
  let [countriesPerPage, setCountriesPerPage] = useState(10); // van a haber 10 paises por pagina
  if (currentPage === 1) countriesPerPage = 9; // en la primer pagina tiene que haber 9 segun el readme
  const indexLastCountry = currentPage * countriesPerPage; // Indice del ultimo pais de la pagina para que la siguiente tenga los siguientes paises
  const indexFirstCountry = indexLastCountry - countriesPerPage;
  const currentCountries = allCountries.slice(
    //es un array donde estan los paises que se deben mostrar en esa pagina
    indexFirstCountry, //Indice del primer pais correspondiente a esa pagina
    indexLastCountry //indice del ultimo pais correspondiente a esa pagina
  );
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [orderName, setOrderName] = useState("");
  const [orderPopulation, setOrderPopulation] = useState("");
  useEffect(() => {
    if (!allCountries.length) {
      dispatch(getCountries());
    }
    dispatch(getActivities());
  }, [dispatch]);

  function handleSelectByContinent(e) {
    e.preventDefault();
    dispatch(filterByContinent(e.target.value));
    setCurrentPage(1);
  }

  function handleSelectByActivities(e) {
    e.preventDefault();
    dispatch(filterByActivities(e.target.value));
    setCurrentPage(1);
  }

  function handleSelectByName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrderName("Order" + e.target.value);
  }

  function handleSelectByPopulation(e) {
    e.preventDefault();
    dispatch(orderByPopulation(e.target.value));
    setCurrentPage(1);
    setOrderPopulation("Order" + e.target.value);
  }

  return (
    <div className="home">
      <Navbar />
      <div className="searchandfilters">  

      {/* searchandfilters Contenedor para ordenamientos , filtros y barra de busqueda */}
        <div className="Orders">
          <h3>Ordenar por:</h3>
          <div className="selects">
            <div className="bypopulation">
            <select className="selectbypopulation" onChange={(n) => handleSelectByPopulation(n)}>
              <option selected disabled>
                Habitantes
              </option>
              <option value="ascendente">Ascendente</option>
              <option value="descendente">Descendente</option>
            </select>
          </div>
          <div className="byname">
            <select className="selectbyname" onChange={(n) => handleSelectByName(n)}>
              <option selected disabled >
                Alfabeto
              </option>
              <option value="atoz">A-Z</option>
              <option value="ztoa">Z-A</option>
            </select>
          </div>
          </div>
          
        </div>

        <SearchBar />

        <div className="Filters">
          <h3>Filtrar por:</h3>
          <div className="selects2">
          <div className="Byactivities">
            <select className="filterbyactivity" onChange={(e) => handleSelectByActivities(e)}>
              <option selected disabled>
                Actividad
              </option>
              <option value="All">Todas</option>
              {activities.map((a) => (
                <option value={a.name} key={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>
          <div className="Bycontinent">
            <select className="filterbycontinent" onChange={(e) => handleSelectByContinent(e)}>
              <option selected disabled>
                Continente
              </option>
              <option value="All">Todos</option>
              <option value="Africa">Africa</option>
              <option value="Americas">America</option>
              <option value="Antarctic">Antarctida</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europa</option>
              <option value="Oceania">Oceania</option>
            </select>
          </div>
          </div>
        </div>

      </div>

      <div className="cards">
        {/* Contenedor donde se renderizan las tarjetas   de los paises */}
        {currentCountries?.map((c) => {
          return (
            <div key={c.id}>
              <Link className="linkCard" to={"/home/" + c.id}>
                <Card
                  className="card"
                  name={c.name}
                  flag={c.flagimg}
                  continent={c.continent}
                  id={c.id}
                />
              </Link>
            </div>
          );
        })}
      </div>
      
        <Paginate
          countriesPerPage={countriesPerPage}
          allCountries={allCountries.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      
    </div>
  );
}
