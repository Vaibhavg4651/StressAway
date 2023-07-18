import React from "react";
import { ToastContainer, toast } from 'react-toastify'
import { useState,  } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import Logo from "../assets/logo-no-background.svg";
import gg from "../assets/google.png";
import fb from "../assets/fbook.png";

const Register = () => {
  const [email, setemail] = useState('')
  const [name, setname] = useState('')
  const [age, setAge] = useState('')
  const [institution, setInstitution] = useState('')
  const [password, setpassword] = useState('')
  const navigate=useNavigate()
  const dispatch = useDispatch()

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
    else if (!password ) {
      err('provide password greater than 8 characters')
      return false
    }
    else if (!name) {
      err('provide name')
      return false
    }
    return true
  }
  

  const google = async () => {
    try {
      const res = window.open("http://localhost:5000/auth/google")
      if (res.data.success === true) {
        toast.success("Successfully Logged In", {
          'position': 'bottom-right',
          'theme': 'colored'
        })
        
        navigate(`/user`)
      } else {
        err(res.data.message)
      }
    } catch (e) {
      err("something went wrong...")
    }
  }

  const facebook = async () => {
    try {
      const res = window.open("http://localhost:5000/auth/facebook")
      if (res.data.success === true) {
        toast.success("Successfully Logged In", {
          'position': 'bottom-right',
          'theme': 'colored'
        })
        navigate(`/user`)
      } else {
        err(res.data.message)
      }
    } catch (e) {
      err("something went wrong...")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const v = validate()
    if (v) {
     
      try{
        const res=await axios.post("http://localhost:5000/register",{email,password,name, institution, age});
        if(res.data.success===true){
          toast.success("Successfully Registered", {
            'position': 'bottom-right',
            'theme': 'colored'
          })
          navigate('/login')
        }else{
            err(res.data.message)
        }}catch(e){
            err("something went wrong...");
        }

    }

  }
  
  return (
    <div className="Login">
      <section className="login-content-1">
        <img src={Logo} style={{ width: " 452.38px", height: "98px" }} alt="" />
      </section>
      <section className="login-content-2">
        <div className="login-content-2-div">
          <a
            className="logintext"
            style={{color: "#545454",  fontSize: "1.1rem" }}
          >
            Login
          </a>
          <button
            className="loginbtn"
            style={{
              margin: "1.6rem",
              marginRight: "0",
              "margin-left": "3rem",
              width: " 159.27px",
              height: "50.76px",
            }}
          >
            <a
              className="logintext"
              style={{ color: "white", fontSize: "1.1rem" }}
            >
              Register
            </a>
          </button>
        </div>
        <div className="login-content-div" style={{ height: "478px" }}>
          <h1>Welcome</h1>
          Please login to your account
        </div>
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <label htmlFor="name" className="label-input-login">
              Name
            </label>
            <input
              id="name"
              className="login-input"
              autoComplete="off"
              type="text"
              placeholder=" "
              value={name}
              required
              onChange={(e) => { setname(e.target.value) }}
            />
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
              required
            />
            <label htmlFor="password" className="label-input-login">
              Password
            </label>
            <input
              id="password"
              className="login-input"
              type="text"
              autoComplete="off"
              value={password}
              onChange={(e) => { setpassword(e.target.value) }}
              placeholder=""
              required
            />
            <label htmlFor="email" className="label-input-login">
              Institution/School
            </label>
            <input
              id="email"
              className="login-input"
              autoComplete="off"
              type="text"
              placeholder=" "
              value={institution}
              onChange={(e) => { setInstitution(e.target.value) }}
            />
            <label htmlFor="email" className="label-input-login">
              Age
            </label>
            <input
              id="email"
              className="login-input"
              autoComplete="off"
              type="text"
              placeholder=" "
              value={age}
              onChange={(e) => { setAge(e.target.value) }}
            />
          <div className="loggedin">
            <a href="" style={{ textDecoration: "none", color: "#545454" }}>
              Forgot Password
            </a>
            <button
              className="loginbtn"
              style={{ width: " 159.27px", height: "50.76px" }}
            >
                Register
            </button>
          </div>
          </form>
          <div className="login-logo">
            <div className="logos">
              <div onClick={google}>
                <img src={gg} alt="" />
              </div>
              <div onClick={facebook}>
                <img src={fb} alt="" />
              </div>
            </div>
            Terms and Conditions & Privacy Policy
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
};

export default Register 
