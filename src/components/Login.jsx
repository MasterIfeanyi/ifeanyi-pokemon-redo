import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom"
import axios from "../api/axios"
import useAuth from '../hooks/useAuth'

const Login = () => {

    const navigate = useNavigate();
    const location = useLocation();

    // this gets where the user came from 
    const from = location?.state?.from?.pathname || "/";

    // destructure setAuth from our Context
    const { setAuth } = useAuth();

    const LOGIN_URL = "/login"

    const userRef = useRef();

    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");
    const [errMsg, setErrMsg] = useState("");

    // when component mounts, set focus on username input fields
    useEffect(() => {
        userRef.current.focus();
    }, [])

    // clear error message when user or password field changes
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(LOGIN_URL, JSON.stringify({ user, pwd }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            })
            const accessToken = data?.accessToken;

            // save response into global auth state
            setAuth({ user, pwd, accessToken })
            console.log(data)
            setUser("");
            setPwd("");
            navigate(from, { replace: true })
        } catch (err) {
            if (!err?.response) {
                setErrMsg("No Server Response");
            } else if (err.response?.status === 400) {
                setErrMsg("Missing Username or Password");
            } else if (err.response?.status === 401) {
                setErrMsg("Unauthorized");
            } else {
                setErrMsg("Login Failed");
            }            
        }
    }


  return (
    <section className="section">
        <div className="container">
            <div className="row mt-1">
                <div className="col-12 intro">
                    <h3>Login</h3>
                    <p className="lead mt-3">
                        Please login to access the application
                    </p>
                </div>
            </div>

              
            <div className="row d-flex justify-content-center">
                <p className="errMsg">{errMsg}</p>
                <div className="col-lg-7">
                    <form action="" className="row" onSubmit={handleSubmit}>
                        <div className="form-group col-12">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                className='form-control'
                                value={user}
                                ref={userRef}
                                autoComplete="off"
                                id="username"
                                onChange={(e) => setUser(e.target.value)}
                            />
                        </div>
                        <div className="form-group col-12">
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password"
                                value={pwd}
                                onChange={(e) => setPwd(e.target.value)}
                                id="password"
                                autoComplete='off'
                                className='form-control'
                            />
                        </div>
                                           
                        <div className=''>
                            <button className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>

              

            <div className="row">
                <div className="col-12 intro">
                    <div className="d-sm-flex mt-2 justify-content-center align-items-center text-center lead">
                        <small className="me-4">Don't have an account ?</small>
                        <Link to="/register">
                            <button className="btn btn-primary">Register</button>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    </section>
  )
}

export default Login