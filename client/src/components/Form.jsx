import React, { useState, useEffect } from "react";
import { Link,  useHistory } from "react-router-dom";
import { postActivity,  getCountries } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";
import "../style-sheets/Form.css"

function validate(input) {
    let errors = {}; 

    if(input.name) {
        errors.name = ""
    } else { errors.name = "Idicar nombre de actividad"}

    if(input.difficulty) {
        errors.difficulty = ""
    } else { errors.difficulty = "Selecciona una dificultad"}

    if(input.duration) {
        errors.duration = "Indica una duracion"}

    if(input.season) {
        errors.season = ""
    } else { errors.season = "Selecciona una temporada"}
    
    if(input.countries.length) {
        errors.countries = ""
    } else { errors.countries = "Choose at least one country"}

   return errors; 
}

export default function ActivityCreate(){
    const dispatch = useDispatch(); 
    const history = useHistory(); 
    const countries = useSelector((state) => state.countries); 
    const [errors, setErrors] = useState({}); 

    useEffect(() => { 
        dispatch(getCountries()); 
    }, [dispatch]); 

    const [ input, setInput ] = useState({ 
        difficulty: 0,
        duration: 0,
        season: "",
        countries: [],
        like: 0,
    });

    function handleChange(e) { 
        setInput((input) => ({ 
            ...input,
            [e.target.name]: e.target.value,  
        })
        );
    }


    function handleSelectCountry(e) { 
        setInput((input) => ({
            ...input,
            countries: [...input.countries, e.target.value,] 
        }));

        setErrors( 
            validate({
                ...input,
                countries: [...input.countries, e.target.value],
            })
        )
    }

    function handleSubmit(e) { 
        if (input.name  && input.duration && input.season && input.countries ) {
            e.preventDefault();
            dispatch(postActivity(input));
            alert("You add a new Activity");
            setInput({
                name: "",
                difficulty: 0,
                duration: 0,
                season: "",
                countries: [],
            });
            history.push("/home");
        } else {
            e.preventDefault();
            console.log(errors)
            alert("You must complete every field correctly!");
        }
    }

    function handleDelete(e,d){
        e.preventDefault();
        setInput({
            ...input,
            countries: input.countries.filter((country) => country !== d),
        });
    }

    return (
        
        <div className="maincontainer">
            <Navbar/>
            
            <div className="form">
                <form onSubmit={(e) => handleSubmit(e)}> 

                    <div className="selectname">
                        
                        <input
                            className="input-text"
                            placeholder="Nombre de la actividad"
                            type="text"
                            value={input.name}
                            name="name"
                            onChange={(e) => handleChange(e)}
                        />
                        {errors.name && <h4 className="errors">{errors.name}</h4>} 
                    </div>

                    
                        

                        <div className="difficulty">
                            <div className="title"><h3>Dificultad:</h3></div>
                            <div className="selects"><label><input
                            type="radio"
                            required
                            name="difficulty"
                            value="1"
                            onChange={(e) => handleChange(e)}
                            />1       
                            </label>                      

                            <label><input
                            type="radio"
                            required
                            name="difficulty"
                            value="2"
                            onChange={(e) => handleChange(e)}
                            />2
                            </label>

                            <label><input
                            type="radio"
                            required
                            name="difficulty"
                            value="3"
                            onChange={(e) => handleChange(e)}
                            />3
                            </label>

                            <label><input
                            type="radio"
                            required
                            name="difficulty"
                            value="4"
                            onChange={(e) => handleChange(e)}
                            />4
                            </label>

                            <label><input
                            type="radio"
                            required
                            name="difficulty"
                            value="5"
                            onChange={(e) => handleChange(e)}
                            />5
                            </label></div>
                        </div>
                    

                    <div className="duration">
                        <div className="titleduration"><h3>Duracion en horas:</h3></div>
                        <input
                            className="inputduration"
                            type="integer"
                            value={input.duration}
                            name="duration"
                            onChange={(e) => handleChange(e)}
                        /> 
                        {errors.duration && <h4 className="errors">{errors.duration}</h4>} 
                    </div>

                   

                    <div className="season">
                        <select className="selectseason" name="season" id="season" onChange={(e) => handleChange(e)}>
                            <option value="empty"> Temporada </option>
                            <option value="Winter" key="Winter">Invierno</option>
                            <option value="Autumn" key="Autumn">Otoño</option>
                            <option value="Spring" key="Spring">Primavera</option>
                            <option value="Summer" key="Summer">Verano</option>
                        </select>
                        {errors.season && <h4 className="errors">{errors.season}</h4>}  
                    </div>





                    <div className="ubication">
                        <select className="selectubication" onChange={(e) => handleSelectCountry(e)}>
                          <option selected disabled>Seleccionar Ubicacion</option>
                            {countries.map((c) => (
                                <option value={c.name} key={c.name}>
                            {c.name}
                            </option>
                            ))}
                        </select> 
                    </div>
                    <div className="ubications">
                        {input.countries.map((c, i) => ( 
                            <ul className="ubicationcontainer" key={i}>
                                <div className="btncontainer"><button className="delete" onClick={(e) => handleDelete (e, c)}>x</button> </div>
                                <div className="titlecontainer"><li className="titlecountry">{c}</li></div>
                            </ul>
                        ))}
                        {errors.countries && <h4 className="errors">{errors.countries}</h4>} 
                    </div>
                    <div className="button"><button type="submit" className="submitbtn">
                        Create
                    </button></div>
                </form>
            </div>
        </div>
        
    )



}