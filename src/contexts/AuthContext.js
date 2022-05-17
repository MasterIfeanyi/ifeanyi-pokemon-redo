import React, { createContext,  useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from "../api/axios";


export const AuthContext = createContext({})

export const AuthProvider = ({children}) => {

    const navigate = useNavigate();

    const [auth, setAuth] = useState({})

    const [pokemon, setPokemon] = useState([]);

    const logout = async () => {
        // if used in more components, this should be in context
        try {
            // axios to /logout endpoint 
            await axios.get("/logout");
            navigate('login');
            setAuth({});
        } catch (error) {
            console.error(error.message);
        }
    }

  return (
    <AuthContext.Provider value={{auth, setAuth, setPokemon, pokemon, logout}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContext