import React from "react";
import logo from "/logo.png";
import phn from "../assets/phn.png";
import message from "../assets/message.png";
import arrow from "../assets/arrow.png";
import linkdn from "../assets/linkdn.svg";
import twitter from "../assets/twitter.png";
import fb from "../assets/fb.png";

const Footer = () => {
  return (
    <div className="Footer">
      <div className="Foot-section-1">
        <div className="Foot-section-1-content">
          <div className="footerlogo">
            <img src={logo} alt="logo" />
          </div>
          <div className="contact">
            <img src={phn} alt="phn" />
            +91 8423341071
          </div>
          <div className="contact">
            <img src={message} alt="message" />
            shubhank@stressaway.in
          </div>
        </div>
        <div className="newsletter">
          Subscribe
          <div>
            <input type="email" placeholder="Get newsletter" />
            <button>
              <img src={arrow} alt="message" />
            </button>
          </div>
        </div>
      </div>
      <div className="divider"></div>
      <div className="footsection-2">
        <div>
          <div
            style={{
              border: "1.5px solid rgb(231 231 231)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              width: "1.4rem",
              height: "1.4rem",
              margin:"0 0.4rem"
            }}
          >
            <img src={linkdn} alt="message" />
          </div>
          <div
            style={{
              border: "1.5px solid rgb(231 231 231)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              width: "1.4rem",
              height: "1.4rem",
              margin:"0 0.4rem"
            }}
          >
            <img src={fb} alt="message" />
          </div>
          <div
            style={{
              border: "1.5px solid rgb(231 231 231)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "1.4rem",
              height: "1.4rem",
              margin:"0 0.4rem"
            }}
          >
            <img src={twitter} alt="message" />
          </div>
        </div>
        <div className="footer-text">
          Please note that StressAway is not a suicide helpline. In case you are
          suicidal, <br /> please call a suicide helpline immediately at 9152987821 or
          1800-5990019.
        </div>
        <div>© 2023. All rights reserved</div>
      </div>
    </div>
  );
};

export default Footer;
