import React from "react";
import logo from "../assets/logo.png";

const About = () => {
  return (
    <div className="About" id="About">
      <div className="about">
        <h1>About</h1>
        <img src={logo} alt="My Image" />
        <p>
          StressAway offers a virtual platform for counseling and emotional
          support to enhance mental well-being for Students. Through our
          services, you can share your problems and improve your mental health.
          Our sessions are private and confidential. Our experts will help you
          navigate your concerns effectively.
        </p>
      </div>
    </div>
  );
};

export default About;
