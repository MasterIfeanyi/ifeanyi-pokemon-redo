import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";


// attach interceptor to axiosPrivate
const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {

        // if the request header has not been set already, set the accessToken
        const requestIntercept = axiosPrivate.interceptors.request.use(config => {
            if (!config.headers["Authorization"]) {
                config.headers["Authorization"] = `Bearer ${auth?.accessToken}`
            }
            return config
        }, (error) => {
                return Promise.reject(error)
            }   
        )



        // attach new access Token to authorization header, before re-trying the request
        const responseIntercept = axiosPrivate.interceptors.response.use(response => response, async (error) => {
            const prevRequest = error?.config;
            if (error?.response?.status === 403 && !prevRequest?.sent) {
                prevRequest.sent = true;
                // get new accessToken
                const newAccessToken = refresh();
                // attach the headers
                prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                // re-try the request
                return axiosPrivate(prevRequest)
            }
            return Promise.reject(error)
        })

        // clean up function, when component un-mounts, remove interceptors
        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept)
            axiosPrivate.interceptors.response.eject(responseIntercept)
        }


    }, [auth, refresh])

    return axiosPrivate
}



export default useAxiosPrivate