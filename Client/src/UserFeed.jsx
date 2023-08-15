import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import DiagnosticTest from "./components/DiagnosticTest";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Footer from "./components/Footer";
import team from "./assets/Teamwork.png";
import happy from "./assets/happy.png";
import angry from "./assets/angry.png";
import anxious from "./assets/anxious.png";
import sad from "./assets/sad.png";
import { ToastContainer, toast } from "react-toastify";
import About from "./components/About";

const UserFeed = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => {
    return state;
  });

  const dataset = useSelector((state) => state.user.userdata);
  const [isClicked, setIsClicked] = useState(false);
  const [isSessionClicked, setIsSessionClicked] = useState(false);
  const [sessions, setSessions] = useState([]);
  const check = dataset.googleId
    ? "guser"
    : dataset.facebookId
    ? "fuser"
    : "User";

  const updateField = async (value) => {
    setIsClicked(true);
    try {
      await axios.put(`http://localhost:5000/user`, {
        id: dataset._id,
        newValue: { [value]: Date() },
        check: check,
      });

      toast.success("Mood saved", {
        position: "bottom-right",
        theme: "colored",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getSessions = async (e) => {
    e.preventDefault();
    setIsSessionClicked(!isSessionClicked);
    try {
      const response = await axios.post(
        `http://localhost:5000/user/getsessions`,
        {
          userId: dataset._id,
        }
      );
      setSessions(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <section>
        <div>
          <div className="user">
            <h1>
              Hiii{" "}
              {dataset.googleId
                ? dataset.firstName
                : dataset.name.split(" ")[0]}
            </h1>
            Take a deep breath
            <div className="animation">
              <div className="circular">
                <div className="container">
                  <div className="circle"></div>
                </div>
              </div>
              <img src={team} alt="" style={{ marginLeft: "3rem" }} />
            </div>
          </div>
          <div className="feel">
            <div className="feeling">
              <div className="feel-text">How are you feeling today ?</div>
              <div className="moods">
                <div
                  className={isClicked ? "clicked" : "mood"}
                  onClick={() => {
                    updateField("happy");
                    setIsClicked(true);
                  }}
                >
                  <img src={happy} alt="" />
                  Happy
                </div>
                <div
                  className={isClicked ? "clicked" : "mood"}
                  onClick={() => updateField("Angry")}
                >
                  <img src={angry} alt="" />
                  Angry
                </div>
                <div
                  className={isClicked ? "clicked" : "mood"}
                  onClick={() => updateField("sad")}
                >
                  <img src={sad} alt="" />
                  Sad
                </div>
                <div
                  className={isClicked ? "clicked" : "mood"}
                  onClick={() => updateField("anxious")}
                >
                  <img src={anxious} alt="" />
                  Anxious
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`BookSession ${isSessionClicked? "height" : ""}`}id="Services">
          <h1>Book a session</h1>
          <div className="booksession-text">
            Please don’t hesitate. Our team comprises of licensed professionals
            who can help you with your problems and concerns. We have minimal
            costs for students too! Please take a diagnostic test before booking
            a session with our experts.
          </div>
          <div className="session-button">
            <button>
              <a
                href={user.isloggedin === true ? `/user/session` : "/login"}
                style={{ textDecoration: "none", color: "#FFFBD6" }}
              >
                Book a session
              </a>
            </button>
            <button onClick={getSessions}>
              <a href=" " style={{ textDecoration: "none", color: "#FFFBD6" }}>
                My sessions
              </a>
            </button>
          </div>
          {isSessionClicked && (
            <div className="my-sessions">
              <table className="sessions-table">
                <thead>
                  <tr>
                    <th>S.no</th>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Mode</th>
                  </tr>
                </thead>
                <tbody>
                  {sessions.map((item, index) => (
                    <tr key={index + 1}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.appointmentDate}</td>
                      <td>{item.appointmentTime}</td>
                      <td>{item.appointmentType}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <ToastContainer />
      </section>
      <DiagnosticTest />
      <About />
      <Footer />
    </div>
  );
};

export default UserFeed;
