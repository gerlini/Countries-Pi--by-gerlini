import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, Clean } from "../actions";
import Navbar from "./Navbar";
import "../style-sheets/Detail.css";

export default function Detail(props) {
  const dispatch = useDispatch();

  const [cambio, setCambio] = useState(false);
  const detail = useSelector((state) => state.detail);
  const allActivities = useSelector((state) => state.activities);

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
    setCambio(true);
    return () => {};
  }, [dispatch, props.match.params.id]);

  return (
    <div>
      <Navbar />
      <div className="detailandactivities">
        <div className="Countryinfo">
          <div className="titleandimg">
            <h1>{detail.name}</h1>

            <img className="mainimg" src={detail.flagimg} alt="flagimag" />
          </div>
            <div className="infoaboutcountry">
            <div className="continentandregion">
            <div className="contienentcontainer">
              <h2 className="tittle2">Continente</h2>
              <p>{detail.continent}</p>
            </div>

            <div className="regioncontainer">
              <h2 className="tittle2">Region</h2>
              <p>
                {detail.subregion
                  ? detail.subregion
                  : "Sin Informacion Registrada"}
              </p>
            </div>
            </div>
            <div className="capitalandid">
              
              <div className="capitalcontainer">
                <h2 className="tittle2">Capital</h2>
                <p>{detail.capital}</p>
              </div>
              <div className="idcontainer">
                <h2 className="tittle2">ID</h2>
                <p>{detail.id}</p>
              </div>
            </div>

            <div className="areaandpopulation">
              <div className="areacontainer">
                <h2 className="tittle2">Area</h2>
                <p>{detail.area} Km</p>
              </div>

              <div className="populationcontainer">
                <h2 className="tittle2">Poblacion</h2>
                <p>{detail.population}</p>
              </div>
            </div>

            </div>
          
          
        </div>

        <div className="detailact">
          <h2>Actividades</h2>

          <div className="allactivities">
            {detail.activities && detail.activities.length ? (
              detail.activities.map((a) => {
                return (
                  <div
                    className="cardactivity"
                    key={a.country_activities.activityId}
                  >
                    <h3 className="activitytitle">{a.name}</h3>
                    <div className="difficultyandid">
                      <p>Id: {a.country_activities.activityId}</p>
                      <p>Difficulty: {a.difficulty}</p>
                    </div>
                    <div className="durationandseason">
                      <p>Duracion: {a.duration}Hs</p>
                      <p>Temporada: {a.season}</p>
                    </div>

                    {console.log(a)}
                  </div>
                );
              })
            ) : (
              <p>No hay actividades </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
