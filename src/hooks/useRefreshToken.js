import axios from "../api/axios";
import useAuth from "./useAuth";


const useRefreshToken = () => {
    
    // global state
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get("/refresh", {
            // send cookies to the server
            withCredentials: true
        });
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            // show the new accessToken we receive
            console.log(response.data.accessToken)
            // replace accessToken in the state with the new one
            return { ...prev, accessToken: response.data.accessToken }
        });
        return response?.data?.accessToken;
    }

  return refresh
}


export default useRefreshToken