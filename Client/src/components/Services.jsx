import React from "react";
import vect from "../assets/Vector1.png";
import chat from "../assets/chat.png";
import call from "../assets/call.png";
import meet from "../assets/meet.png";
import { useSelector } from "react-redux";
import circle1 from "../assets/Ellipse1.png";
import circle2 from "../assets/Ellipse2.png";
import circle3 from "../assets/Ellipse3.png";
import school from "../assets/school.png";
import bond from "../assets/bond.png";
import heart from "../assets/ecg-heart.png";
import security from "../assets/security.png";

const Services = () => {
  const {user}=useSelector((state)=>{return state})
  const dataset = useSelector((state) => state.user.userdata);

  return (
    <div className="Services">
      <div className="Vector">
        <div className="vector">
          <img src={vect} className="vector1" alt="star" />
          <img src={vect} className="vector2" alt="star" />
          <img src={vect} className="vector3" alt="star" />
          <img src={vect} className="vector4" alt="star" />
          <img src={vect} className="vector5" alt="star" />
          <img src={vect} className="vector6" alt="star" />
          <img src={vect} className="vector7" alt="star" />
          <img src={vect} className="vector8" alt="star" />
          <img src={vect} className="vector9" alt="star" />
        </div>
        <div className="service-btns">
          <div className="serv-btns">
            <button className="chat">
          <img src={chat} className="chatimg" alt="star" />
              Chat
            </button>
          </div>
          <div className="serv-btns">
            <button className="chat">
          <img src={call} className="" alt="star" />
              call
            </button>
          </div>
          <div className="serv-btns">
            <button className="chat">
          <img src={meet} className="" alt="star" />
            Meet
            </button>
          </div>
        </div>
        <div className="vectors">
          <img src={vect} className="vector1" alt="star" />
          <img src={vect} className="vector2" alt="star" />
          <img src={vect} className="vector3" alt="star" />
          <img src={vect} className="vector4" alt="star" />
          <img src={vect} className="vector5" alt="star" />
          <img src={vect} className="vector6" alt="star" />
          <img src={vect} className="vector7" alt="star" />
          <img src={vect} className="vector8" alt="star" />
          <img src={vect} className="vector9" alt="star" />
        </div>
      </div>
      <div className="session">
        <div className="circles">
          <img src={circle1} className="circle1" alt="star" />
          <img src={circle2} className="circle2" alt="star" />
          <img src={circle3} className="circle3" alt="star" />
        </div>
          <button className="BookSessionbtn">
            <a href={ user.isloggedin===true? `/user/session` : "/login"} style={{textDecoration: "none", color:" #FFFBD6"}}>
              Book a session
              </a>
          </button>
      </div>
      <div className="icons">
        <div className="icon-text">
          <img src={bond} className="" alt="star" />
          Anonymous  <br />Discussions
        </div>
        <div className="icon-text">
          <img src={security} className="" alt="star" />
          Private & <br />Confidential
        </div>
        <div className="icon-text">
          <img src={school} className="" alt="star" />
          Sessions at <br />School
        </div>
        <div className="icon-text">
          <img src={heart} className="" alt="star" />
          Digital Well-being <br /> Awareness
        </div>
      </div>
    </div>
  );
};

export default Services;
