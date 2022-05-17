import axios from "axios"
// const BASE_URL = "http://localhost:3500"
const BASE_URL = "https://ifeanyi-pokemon-backend.herokuapp.com/"

export default axios.create({
    baseURL: BASE_URL
});

// custom instance of axios where we attach interceptors
export const axiosPrivate =  axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true
});