import React from "react";
import Logo from "../assets/logo-no-background.svg";
import gg from "../assets/google.png";
import fb from "../assets/fbook.png";
import { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import eye from "../assets/eye.png";
import ieye from "../assets/invisible.png";
import axios from 'axios'
import {setdata,setisLoggedin} from '../reducers/userSlice'

const Login = () => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);
    const dispatch=useDispatch()
    const location = useLocation();
    const navigate=useNavigate()

   const err = (msg) => {

       toast.error(msg, {
           'position': 'bottom-right',
           'theme': 'colored'
       })
   }
    const validate = () => {
      if (!email) {
          err('provide email')
          return false
      }
      else if (!password) {
          err('provide password')
          return false
      }
      return true
  }

  const google = async () => {
    try {
      const res = window.open(`${process.env.NEXT_PUBLIC_API_URL}/auth/google`)
      if (res.data.success === true) {
        navigate(`/user`)
      } else {
        err(res.data.message)
      }
    } catch (e) {
      err("Wrong email...")
    }
  }

  const facebook = async () => {
    try {
      const res = window.open(`${process.env.NEXT_PUBLIC_API_URL}/auth/facebook`);
      if (res.data.success === true) {
        toast.success("Successfully Logged In", {
          position: "bottom-right",
          theme: "colored",
        });
        navigate(`/user`);
      } else {
        err(res.data.message);
      }
    } catch (e) {
      err("Invalid email or password");
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault()
    const v = validate() 
    if (v) {
        try{
            const res=await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`,{email,password});
            if(res.data.success===true){
              dispatch(setisLoggedin(true))
             dispatch(setdata(res.data.message))

             toast.success("login successfull", {
                'position': 'bottom-right',
                'theme': 'colored'
            })
            navigate(`/user`)
            }else{
                err(res.data.message)
            }}catch(e){
                err("Invalid email or password");
            }
    
    }
}

  return (
    <div className="Login" >
      <section className="login-content-1">
        <img src={Logo} style={{ width: " 452.38px", height: "98px" }} alt="" />
      </section>
      <section className="login-content-2">
        <div className="login-content-2-div">
          <button
            className="loginbtn"
            style={{
              margin: "2.6rem 2rem 0.6rem 0px",
              width: "143.27px",
              height: "43.76px"
            }}
          >
            <a
              className="logintext"
              style={{ color: "white", fontSize: "1.1rem" }}
            >
              Login
            </a>
          </button>
          <a
            href="/Register"
            className="logintext"
            style={{ color: "#545454", fontSize: "1.1rem" }}
          >
            Register
          </a>
        </div>
        <div className="login-content-div">
          <h1>Welcome</h1>
          Please login to your account
        </div>
        <div className="login-form">
          <form action="">
            <label htmlFor="email" className="label-input-login">
              Email
            </label>
            <input
              id="email"
              className="login-input"
              autoComplete="off"
              type="text"
              value={email}
              onChange={(e) => { setemail(e.target.value) }}
              placeholder=" "
            />
            <label htmlFor="password" className="label-input-login">
              Password
            </label>
            <input
              id="password"
              className="login-input"
              style={{position:"relative"}}
              autoComplete="off"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => { setpassword(e.target.value) }}
              placeholder=""
            />
            <div style={{position:"relative"}}>
            <div className="login-form-eye" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <img src={eye} alt="" /> : <img src={ieye} alt="" />}
            </div>
            </div>
            <div className="loggedin">
              <a href="/forgetPassword" style={{ textDecoration: "none", color: "#545454" }}>
                Forgot Password
              </a>
              <button
                className="loginbtn"
                value='Submit' onClick={handleSubmit} type='submit'
                style={{ width: " 159.27px", height: "50.76px" }}
              >
                <a
                  className="logintext"
                  style={{ color: "white", fontSize: "1.1rem" }}
                >
                  Login
                </a>
              </button>
            </div>
          </form>
          <div className="login-logo">
            <div className="logos">
            <div onClick={google}>
              <img src={gg} alt="" />
            </div>
            <div onClick={facebook}>
              <img src={fb} alt=""/>
            </div>
            </div>
            <div style={{fontSize:"1.2rem"}}>

            <a href="/Terms.pdf" style={{textDecoration:"none" ,color: "#545454"}}> Terms and Conditions  &nbsp;</a>
            & 
            <a href="/Privacy.pdf" style={{textDecoration:"none" ,  color: "#545454"}}>

              &nbsp; Privacy Policy
            </a>
            </div>
          </div>
        </div>
        <ToastContainer />
      </section>
    </div>
  );
};

export default Login;
