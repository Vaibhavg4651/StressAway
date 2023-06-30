import React, { useState } from "react";
import Navbar from "./components/Navbar";
import DiagnosticTest from "./components/DiagnosticTest";
import axios from "axios";
import { useSelector } from "react-redux";
import Footer from "./components/Footer";
import team from "./assets/Teamwork.png";
import happy from "./assets/happy.png";
import angry from "./assets/angry.png";
import anxious from "./assets/anxious.png";
import sad from "./assets/sad.png";
import { ToastContainer, toast } from 'react-toastify'

const UserFeed = () => {
  const { user } = useSelector((state) => {
    return state;
  });
  const dataset = useSelector((state) => state.user.userdata);
  const [isClicked, setIsClicked] = useState(false);

  const updateField = async (value) => {
    setIsClicked(true);
    try {
       await axios.put(
        `http://localhost:5000/api/user/${dataset._id}`,
        {
          id: dataset._id,
          newValue: { [value]: dataset.updatedAt },
        }
        );
       
        toast.success("Mood saved", {
          position: "bottom-right",
          theme: "colored",
        });
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
            <h1>Hiii {dataset.name}</h1>
            Take a deep breath
            <img src={team} alt="" />
          </div>
          <div className="feel">
            <div className="feeling">
              <div className="feel-text">How are you feeling today ?</div>
              <div className="moods">
                <div
                  className={isClicked ? "clicked" : "mood"}
                  onClick={() => {updateField("happy")
                  setIsClicked(true)}
                }
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
                <div className={isClicked ? "clicked" : "mood"} onClick={() => updateField("anxious")}>
                  <img src={anxious} alt="" />
                  Anxious
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="BookSession">
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
                href={
                  user.isloggedin === true
                    ? `/user/${dataset._id}/session`
                    : "/login"
                }
                style={{ textDecoration: "none", color: "#FFFBD6" }}
              >
                Book a session
              </a>
            </button>
            <button>
              <a
                href="/session"
                style={{ textDecoration: "none", color: "#FFFBD6" }}
              >
                My sessions
              </a>
            </button>
          </div>
        </div>
        <ToastContainer />
      </section>
      <DiagnosticTest />
      <Footer />
    </div>
  );
};

export default UserFeed;
