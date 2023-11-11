import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../assets/logo-no-background.svg";
import gg from "../assets/google.png";
import eye from "../assets/eye.png";
import ieye from "../assets/invisible.png";
import fb from "../assets/fbook.png";
import API_URL from "../config";

const Register = () => {
  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [age, setAge] = useState(0);
  const [institution, setInstitution] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const err = (msg) => {
    toast.error(msg, {
      position: "bottom-right",
      theme: "colored",
    });
  };

  const validate = () => {
    if (!email) {
      err("provide email");
      return false;
    } else if (!password || password.length < 6) {
      err("provide password greater than 6 characters");
      return false;
    } else if (!name) {
      err("provide name");
      return false;
    }
    return true;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const google = async () => {
    try {
      const res = window.open(`${API_URL}/auth/google`);
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
      err("something went wrong...");
    }
  };

  const facebook = async () => {
    try {
      const res = window.open(`${API_URL}/auth/facebook`);
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
      err("something went wrong...");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if(!isValidEmail(email)){
      err("Invalid email");
      return false;
    }
    if (v) {
      try {
        const res = await axios.post(`${API_URL}/register`, {
          email,
          password,
          name,
          institution,
          age,
        });
        if (res.data.success === true) {
          toast.success("Successfully Registered", {
            position: "bottom-right",
            theme: "colored",
          });
          navigate("/login");
        } else {
          err(res.data.message);
        }
      } catch (e) {
        err("something went wrong...");
      }
    }
  };

  return (
    <div className="Login Register" >
      <section className="login-content-1" >
        <img src={Logo} style={{ width: " 452.38px", height: "98px" }} alt="" />
      </section>
      <section className="login-content-2" >
        <div className="login-content-2-div" style={{marginTop:"2rem"}}>
          <a
           href="/login"
            className="logintext"
            style={{ color: "#545454", fontSize: "1.2rem"}}
          >
            Login
          </a>
          <button
            className="loginbtn"
            style={{
              margin: "2.6rem 1rem 0.6rem 2rem",
              width: "143.27px",
              height: "43.76px"
            }}
          >
            <a
              className="logintext"
              style={{ color: "white", fontSize: "1.2rem" }}
            >
              Register
            </a>
          </button>
        </div>
        <div className="login-content-div" style={{ height: "478px", marginTop:"0.5rem" }}>
          <h1>Welcome</h1>
          Please login to your account
        </div>
        <div className="login-form  register">
          <form >
            <label htmlFor="name" className="label-input-login">
              Name <span class="required">*</span>
            </label>
            <input
              id="name"
              className="login-input"
              autoComplete="off"
              type="text"
              placeholder=" "
              value={name}
              required
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
            <label htmlFor="email" className="label-input-login">
              Email <span class="required">*</span>
            </label>
            <input
              id="email"
              className="login-input"
              autoComplete="off"
              type="text"
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
              placeholder=" "
              required
            />
            <label htmlFor="password" className="label-input-login">
              Password <span class="required">*</span>
            </label>
            <input
              id="password"
              className="login-input"
              type={showPassword ? "text" : "password"}
              autoComplete="off"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              placeholder=""
              
              required
            />
            <div style={{position:"relative"}}>
            <div onClick={() => setShowPassword(!showPassword)} style={{width:"4rem" , position:"absolute" , top:"-2rem", left:"28rem"}}>
              {showPassword ? <img src={eye} alt="" /> : <img src={ieye} alt="" />}
            </div>
            </div>
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
              onChange={(e) => {
                setInstitution(e.target.value);
              }}
            />
            <label htmlFor="email" className="label-input-login">
              Age
            </label>
            <input
              id="email"
              className="login-input"
              autoComplete="off"
              onChange={(e) => {
                setAge(e.target.value);
              }}
              />
              </form>
            <div className="loggedin">
              <a href="/forgetPassword" style={{ textDecoration: "none", color: "#545454" }}>
                Forgot Password
              </a>
              <button
              onClick={handleSubmit}
                className="loginbtn"
                style={{ width: " 159.27px", height: "50.76px" }}
              >
               <a
              className="logintext"
              style={{ color: "white", fontSize: "1.2rem" }}
            >
              Register
            </a>
              </button>
            </div>
          <div className="login-logo">
            <div className="logos">
              <div onClick={google}>
                <img src={gg} alt="" />
              </div>
              <div onClick={facebook}>
                <img src={fb} alt="" />
              </div>
            </div>
            <div style={{fontSize:"1.2rem"}}>
            <a href="/Terms.pdf" style={{textDecoration:"none" ,color: "#545454"}}> Terms and Conditions &nbsp; </a>
            & 
            <a href="/Privacy.pdf" style={{textDecoration:"none" ,  color: "#545454"}}>

              &nbsp; Privacy Policy
            </a>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
};

export default Register;
