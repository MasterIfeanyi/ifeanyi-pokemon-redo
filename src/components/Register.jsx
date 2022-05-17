import React, { useState, useEffect, useRef } from 'react'
import { FaTimes, FaCheck, FaInfoCircle } from "react-icons/fa";
import axios from "../api/axios";
import { Link, useLocation, useNavigate } from "react-router-dom"
import useAuth from '../hooks/useAuth';


const Register = () => {

  const navigate = useNavigate();
  const location = useLocation();

  // this gets where the user came from 
  const from = location?.state?.from?.pathname || "/";

  const { setAuth } = useAuth();

  // username and password state
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  
  // error message state
  const [errMsg, setErrMsg] = useState("");


  const REGISTER_URL = "/register"

  const userRef = useRef();


  // confirm password state
  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false)
  const [matchFocus, setMatchFocus] = useState(false)

  // when component mounts, set focus on username input fields
  useEffect(() => {
    userRef.current.focus();
  }, []);

  // check if both password matches
  useEffect(() => {
    console.log(pwd);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd])



  // clear error message when user or password field changes
  useEffect(() => {
    setErrMsg('');
  }, [user, pwd])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(REGISTER_URL, JSON.stringify({ user, pwd }),
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
            <h3>Register</h3>
            <p className="lead mt-3">
              Please register to access the application
            </p>
          </div>
        </div>

        <div className="row d-flex justify-content-center">
          <p className="errmsg">{errMsg}</p>
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
              <div className="form-group col-12">
                <label htmlFor="confirm_pwd">Confirm Password
                  <span className={validMatch && matchPwd ? "valid" : "hide"}>
                    <FaCheck />
                  </span>
                  <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                    <FaTimes />
                  </span>
                </label>
                <input
                  value={matchPwd}
                  onChange={(e) => setMatchPwd(e.target.value)}
                  type="password"
                  id="confirm_pwd"
                  placeholder=''
                  className="form-control"
                  autoComplete='off'
                  required
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                />
                <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                  <FaInfoCircle />
                  Must match the first password input field.
                </p>
              </div>                 
              <div className=''>
                <button disabled={!validMatch ? true : false} className="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </div>

        <div className="row">
          <div className="col-12 intro">
            <div className="d-sm-flex mt-2 justify-content-center align-items-center text-center lead">
              <small className="me-4">Already have an account ?</small>
              <Link to="/login">
                <button className="btn btn-primary">Login</button>
              </Link>
            </div>
          </div>
        </div>        

      </div>
    </section>
  )
}

export default Register