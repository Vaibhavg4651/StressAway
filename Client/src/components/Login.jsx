import React from "react";
import Logo from "../assets/logo-no-background.svg";
import gg from "../assets/google.png";
import fb from "../assets/fbook.png";

const Login = () => {
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
              margin: "1.6rem",
              marginLeft: "0",
              "margin-right": "3rem",
              width: " 159.27px",
              height: "50.76px",
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
              Username or Email
            </label>
            <input
              id="email"
              className="login-input"
              autoComplete="off"
              type="text"
              placeholder=" "
            />
            <label htmlFor="password" className="label-input-login">
              Password
            </label>
            <input
              id="password"
              className="login-input"
              type="text"
              autoComplete="off"
              placeholder=""
            />
            <div className="loggedin">
              <a href="" style={{ textDecoration: "none", color: "#545454" }}>
                Forgot Password
              </a>
              <button
                className="loginbtn"
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

            <div>
              <img src={gg} alt="" />
            </div>
            <div>
              <img src={fb} alt=""/>
            </div>
            </div>
          Terms and Conditions & Privacy Policy
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
