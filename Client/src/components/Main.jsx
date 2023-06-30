import React from "react";
import Services from "./Services";
import DiagnosticTest from "./DiagnosticTest";
import About from "./About";
import myImage1 from "../assets/Brainstorming.png";
import { useSelector } from "react-redux";
import myImage2 from "../assets/Joyride.svg";
import star from "../assets/star.png";

const Main = () => {
  const {user}=useSelector((state)=>{return state})
  const dataset = useSelector((state) => state.user.userdata);
  return (
    <>
      <div className="hero">
        <div className="header">
          <div className="main-header">
            <div className="headerline">make your mental health a priority</div>
          </div>
        </div>
        <section className="section-1">
          <div className="section-1content"></div>
          <div className="subsection">
            <p>
              Being a student is not easy. There are many problems which you
              can’t tell your friends and <br /> family.
              <br /> Don’t worry! We are here for you :)
            </p>
            <button className="btnprof">
              <a href={ user.isloggedin===true? `/user/${dataset._id}/session` : "/login"} className="btnText">
                Talk To a Professional
              </a>
            </button>
          </div>
        </section>
        <section className="section-2">
          <div className="section-2-content">
            <h1>Why do we need Therapy?</h1>
            <p>
              Around 1 in 7 students in India face depression. Therapy can be an
              essential tool for students to manage stress, improve academic
              performance, address mental health concerns, navigate transitions,
              and enhance personal growth. If you're a student struggling with
              any of these issues, consider reaching out to a therapist for a
              consultation to discuss your concerns and explore your options.
            </p>
          </div>
          <div className="section-2-content-img">
            <img src={myImage1} alt="My Image" />
          </div>
        </section>
        <section className="section-3">
          <div className="section-3-content-img">
            {" "}
            <img src={myImage2} alt="My Image" />
          </div>
          <div className="section-3-content">
            <h1>How does StressAway help you?</h1>
            <p>
              We at StressAway are dedicated to improve the mental well-being of
              the students across India in the best way we can. Open up to your
              Therapist in a space where you get the guidance you need, and your
              concerns get the attention they deserve. <br /> <br /> Stressaway
              is a mental health startup in India that offers the most
              affordable therapy sessions specialized for students. <br />{" "}
              <br /> Are you an institution looking to help your students have a
              better well-being. Drop us a mail and we’ll get back to you ASAP.
              We promise to do every possible effort to ensure that each student
              who approaches us will be treated with utmost care
            </p>
          </div>
        </section>
        <section className="section-4" id="Services">
          <h1>Services</h1>
          <div className="section-4-content">
            <div className="STAR">
              <div className="star1">
                <img src={star} alt="star" />
              </div>
              <div className="star2"></div>
              <img src={star} alt="star" />
            </div>
            <div className="section-4-content-1">
              Stress Away holds consultation sessions in multiple platforms, so
              that you can choose based on your suitable preference.
              <p>
                (We strongly recommend using the video calling platform as it
                helps the counselor understand your concerns)
              </p>
            </div>
          </div>
        </section>
        <Services />
        <DiagnosticTest />
      </div>
        <About />
    </>
  );
};

export default Main;
