import React from "react";
import think from "../assets/Thinking.png";

const DiagnosticTest = () => {
  return (
    <div className="Test">
      <div className="diagnostic-test">
        <div className="test-img">
        <img src={think} className="think" alt="think" />
        </div>
        <div className="test-text">
          <h1>Figure out what’s going with you.</h1>
          <p>
            Take StressAway diagnostic Test to assess yourself regarding the
            mental health issues you face.
            <br />
            <br />
            Knowing your issues is the first step to solve your problems and
            help you with your future{" "}
          </p>
          <button className="testbtn">
          Take the diagnostic test
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticTest;
