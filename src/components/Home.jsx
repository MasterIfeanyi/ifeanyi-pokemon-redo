import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from "react-router-dom"
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import axios from "../api/axios"
import Pokemon from "./Pokemon"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

const Home = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const { pokemon, setPokemon } = useAuth();

    const [pokeApi, setPokeApi] = useState([]);
    

    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        let isMounted = true;
        // used by axios to cancel request
        const controller = new AbortController();

        const getPokemon = async () => {
            try {
                const { data } = await axiosPrivate.get("/pokemon", {
                    // option to cancel request
                    signal: controller.signal
                })
                console.log(data);
                // set users state when component mounts
                isMounted && setPokemon(data);
            } catch (error) {
                if (process.env === "production" && error) {
                    console.error(error);
                } else {
                    // when refreshToken expires
                    navigate("/login", { state: { from: location }, replace: true });
                }
            }
        }

        getPokemon();

        // cleanup function
        return () => {
            // don't set state if component unmounts
            isMounted = false;
            // cancel request if component unmounts
            controller.abort();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) 


    // when component renders dispaly all the names of the pokemon
    useEffect(() => {
        const start = async () => {

            try {
                const { data } = await axios.get("https://pokeapi.co/api/v2/pokemon/")
                setPokeApi(data.results)
            } catch (err) {
                // Handle Error Here
                console.error(err.message);
            }
        }

        start()
    }, [])


    // save pokemon to database
    const savetoDB = async (pokemon) => {
        try {
            if (pokemon !== "Choose a Pokemon") {
                const { data } = await axiosPrivate.post(`/pokemon`, { "pokemon": pokemon })
                setPokemon(data);
                // inbuilt-notification
                toast.success('successful');
            }
        } catch (e) {
            console.log(e.message)
        }
        console.log("Hello", pokemon)
    }

  return (
    <section className="section">
        <div className="container">
            <div className="row">
                <div className="col-12 intro">
                    <p className="lead mt-2">Please, choose your favorite pokemon(s)</p>
                </div>
            </div>
              
            <div className="row d-flex justify-content-center">
                <div className="col-md-7 mb-2">
                    <select name="pokemon" onChange={(e) => {
                          savetoDB(e.target.value)
                        }}>
                        <option>Choose a Pokemon</option>
                        {pokeApi.map(pokemon => (
                            <option key={pokemon.name}>{pokemon.name}</option>
                        ))}
                    </select> 
                </div>
            

                {
                    pokemon?.length ? (
                        <>
                            <h4>Pokemons</h4>
                            <div className="col-12">
                                {pokemon.map((pokemon, i) => <Pokemon key={i} pokemon={pokemon} /> )}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className = "col-12">
                                <p>You have not selected a favourite pokemon</p>
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    </section>
  )
}

export default Home