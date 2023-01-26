const { Router } = require('express');
const axios = require("axios")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {Country , Activities} = require ("../db")
const router = Router();
require ('dotenv').config();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getCountries = async()=>{
    const allCountries = await axios.get("https://restcountries.com/v3/all")
    const Countriesindb = await Country.findAll({
        include:{
            model: Activities,
            attributes: ["name" , "difficulty" , "duration" , "season" ],
            through:{attributes:{}}
        }
    })
    if (!Countriesindb.length) {
    Country.bulkCreate(
        allCountries.data.map((el)=>{
            return{
                id: el.cca3,
                name: el.translations.spa.common,
                flagimg: el.flags[0],
                continent: el.region,
                subregion: el.subregion,
                capital: el.capital ? el.capital[0] : "without info",
                area: el.area, 
                population: el.population
            }

        })
        )
    }

}

router.get("/countries", async (req, res) => {
    const { name } = req.query;
    const setinfo = await getCountries();
    const allCountries =  await Country.findAll({
        include: {model: Activities,
         attributes: ['name', 'difficulty', 'duration', 'season'],
         through: { attributes: {}}
     } 
     });
            if (name) {
            let country = await allCountries.filter(
                (land) => land.name.toLowerCase().includes(name.toLocaleLowerCase())
            );
            if (country.length){
                return res.status(200).json(country);
            }else {
                return res.status(400).json("Not existing country")
            }
            } else {
            return  res.status(200).json(allCountries);
            }
            
       
});

router.get("/countries/:id", async (req,res)=>{
    const { id } = req.params
    const land = await  Country.findByPk(id, {include:{
        model: Activities,
        attributes: ["name" , "difficulty" , "duration" , "season" ],
        through:{attributes:{}}
    }
    })
    if(land) {
        res.status(200).json(land)
    }else{
        res.status(400).json("no country was found with this id")
    }
});

router.get("/activities", async (req,res)=>{  // cargar la tabla al igual que el /cuntries pero con las acts
    const activities = await Activities.findAll();
    return res.status(200).json(activities)
});

router.post("/activity", async (req, res) => {
    const {
        name,
        difficulty,
        duration,
        season,
        countries
        }  = req.body

   
        const [createActivity] = await Activities.findOrCreate({ 
            where:{
                name,
            }, defaults:{
                difficulty, duration, season
            }
        });
  
        const findCountry = await Country.findAll({
           where: {
              name: countries,
           }
        });
        
  
        await createActivity.setCountries(findCountry);
        return res.status(200).json(createActivity)
  
  });

  
module.exports = router;
