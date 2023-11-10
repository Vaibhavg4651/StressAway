import React, { useState } from "react";
import Logo from "../assets/logo-no-background.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import eye from "../assets/eye.png";
import ieye from "../assets/invisible.png";
import axios from "axios";
import API_URL from "../config";

const Forgetpassword = () => {
  const [email, setemail] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [conpassword, setConpassword] = useState("");
  const [showNewPassword, setNewShowPassword] = useState(false);
  const [showConPassword, setConShowPassword] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    if (!email) {
        err('provide email')
        return false
    }
    else if (!newpassword) {
        err('provide password')
        return false
    }
    else if (!conpassword) {
        err('provide password')
        return false
    }
    else if (newpassword !==conpassword) {
        err('passwords do not match')
        return false
    }
    return true
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (v) {
      try {
        const res = await axios.put(`${API_URL}/user/resetpassword`, {
            email, newpassword ,conpassword
        });
        if (res.data.success === true) {
          toast.success("Password reset Successfully", {
            position: "bottom-right",
            theme: "colored",
          });
          window.alert("Password reset Successfully");
          navigate(`/login`);
        } else {
          err(res.data.message);
        }
      } catch (e) {
        err("something went wrong...");
      }
    }
  };

  return (
    <div className="Login">
      <section className="login-content-1">
        <img src={Logo} style={{ width: " 452.38px", height: "98px" }} alt="" />
      </section>
      <section className="login-content-2">
        <div className="login-content-div">
          <h1>Reset Password</h1>
          Please enter the Registered email and new password
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
              onChange={(e) => {
                setemail(e.target.value);
              }}
              placeholder=" "
            />
            <label htmlFor="password" className="label-input-login">
              New Password
            </label>
            <input
              id="password"
              className="login-input"
              style={{ position: "relative" }}
              autoComplete="off"
              type={showNewPassword ? "text" : "password"}
              valuee={newpassword}
              onChange={(e) => {
                setNewpassword(e.target.value);
              }}
              placeholder=""
            />
            <div
            className="fogetpassword-eye1"
              onClick={() => setNewShowPassword(!showNewPassword)}
        
            >
              {showNewPassword ? (
                <img src={eye} alt="" />
              ) : (
                <img src={ieye} alt="" />
              )}
            </div>
            <label htmlFor="password" className="label-input-login">
              Confirm Password
            </label>
            <input
              id="password"
              className="login-input"
              style={{ position: "relative" }}
              autoComplete="off"
              type={showConPassword ? "text" : "password"}
              value={conpassword}
              onChange={(e) => {
                setConpassword(e.target.value);
              }}
              placeholder=""
            />
            <div
            className="fogetpassword-eye2"
              onClick={() => setConShowPassword(!showConPassword)}
            
            >
              {showConPassword ? (
                <img src={eye} alt="" />
              ) : (
                <img src={ieye} alt="" />
              )}
            </div>
            <div className="loggedin">
              <button
                className="loginbtn"
                value="Submit"
                onClick={handleSubmit}
                type="submit"
                style={{ width: " 159.27px", height: "50.76px" }}
              >
                <a
                  className="logintext"
                  style={{ color: "white", fontSize: "1.1rem" }}
                >
                  Reset Password
                </a>
              </button>
            </div>
          </form>
        </div>
        <ToastContainer />
      </section>
    </div>
  );
};

export default Forgetpassword;
