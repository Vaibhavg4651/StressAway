import React, { useState } from "react";
import Navbar from "./Navbar";
import arw from "../assets/uparrow.svg";
import chat from "../assets/chat.svg";
import call from "../assets/call.svg";
import meet from "../assets/meet.svg";
import rup from "../assets/rupee.svg";

const BookSession = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Select your time slot");
  const [selectedWay, setSelectedWay] = useState(" ");
  const [dropdownValue, setDropdownValue] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectedway = (value) => {
    setSelectedWay(value);
  };
  const handleOptionSelect = (value, option) => {
    setSelectedOption(option);
    setDropdownValue(value);
    setIsOpen(false);
  };

  return (
    <>
      <Navbar />
      <div className="Session">
        <div className="session-content-1">
          <div className="session-content-1-img"></div>
        </div>
        <div className="session-content-2">
          <div className="session-content-2-book">Book an appointment</div>
          <form action="">
            <label htmlFor="name" className="label-input-login">
              Name:
            </label>
            <input
              id="name"
              className="login-input"
              autoComplete="off"
              type="text"
              placeholder=" "
              required
            />
            <label htmlFor="name" className="label-input-login">
              Mobile Number:
            </label>
            <input
              id="name"
              className="login-input"
              autoComplete="off"
              type="text"
              placeholder=" "
              required
            />
            <label htmlFor="name" className="label-input-login">
              E-mail ID:
            </label>
            <input
              id="name"
              className="login-input"
              autoComplete="off"
              type="text"
              placeholder=" "
              required
            />
            <label htmlFor="name" className="label-input-login">
              Appointment Date:
            </label>
            <input
              style={{ width: "210px" }}
              id="date"
              className="login-input"
              autoComplete="off"
              type="date"
              placeholder=" "
              required
            />
            <label htmlFor="name" className="label-input-login">
              Appointment Time:
            </label>
            <div className="custom-dropdown">
              <div className="selected-option" onClick={toggleDropdown}>
                {selectedOption}
                <img
                  src={arw}
                  alt=""
                  style={{ marginLeft: "2rem", marginTop: "0.2rem" }}
                />
              </div>
              {isOpen && (
                <div className="maintime">
                  <div
                    className="option1"
                    onClick={() =>
                      handleOptionSelect("option1", "12pm - 12:30pm")
                    }
                  >
                    12pm - 12:30pm
                  </div>
                  <div
                    className="option2"
                    onClick={() =>
                      handleOptionSelect("option2", "12:30pm - 1:00pm")
                    }
                  >
                    12:30pm - 1:00pm
                  </div>
                  <div
                    className="option3"
                    onClick={() =>
                      handleOptionSelect("option3", "1pm - 1:30pm")
                    }
                  >
                    1pm - 1:30pm
                  </div>
                  <div
                    className="option4"
                    onClick={() =>
                      handleOptionSelect("option4", "1:30pm - 2:00pm")
                    }
                  >
                    1:30pm - 2:00pm
                  </div>
                </div>
              )}
              <input
                type="hidden"
                id="dropdown-value"
                name="dropdown-value"
                value={dropdownValue}
              />
            </div>
            <label htmlFor="name" className="label-input-login">
              Appointment Type:
            </label>
            <div className="appointmenttype">
              <div className="chat1" onClick={() => handleSelectedway("chat")}>
                <img src={chat} alt="" style={{margin:" 0 0.4rem "}}/>
                  Chat
                <img src={rup} alt="" style={{margin:"0  0.4rem"}}/>
              </div>
              <div className="call" onClick={() => handleSelectedway("call")}>
                <img src={call} alt=""  style={{margin:" 0 0.4rem "}}/>
                Call
                <img src={rup} alt=""  style={{margin:" 0 0.4rem "}}/>
              </div>
              <div className="meet" onClick={() => handleSelectedway("meet")}>
                <img src={meet} alt=""  style={{margin:" 0 0.4rem "}}/>
                Google meet
                <img src={rup} alt=""  style={{margin:" 0 0.4rem "}}/>
              </div>
            </div>
            <input
              id="appointtype"
              className="login-input"
              type="hidden"
              value={selectedWay}
              required
            />
            <button>Confirm Appointment</button>
          </form>
        </div>
      </div>
      <div className="back-img"></div>
    </>
  );
};

export default BookSession;
