import React, { useState } from "react";
import Navbar from "./Navbar";
import { useSelector} from "react-redux";
import arw from "../assets/uparrow.svg";
import chat from "../assets/chat.svg";
import call from "../assets/call.svg";
import meet from "../assets/meet.svg";
import rup from "../assets/rupee.svg";
import axios from "axios";

const BookSession = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Select your time slot");
  const [selectedWay, setSelectedWay] = useState(" ");
  const [isClicked, setIsClicked] = useState(false);
  const [dropdownValue, setDropdownValue] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");

  const dataset = useSelector((state) => state.user.userdata);

  const checkoutHandler = async (e) => {
    e.preventDefault();
    const { data: {key} } = await axios.get("http://localhost:5000/getkey");
    const { data:{order} } = await axios.post(
      "http://localhost:5000/user/session/checkout",
      {
        amount: 500,
      }
    );
    const options = {
      key: key, // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Stressaway",
      description: "Test Transaction",
      image: "./logo.png",
      order_id: order.id, 
      handler: async(response)=>{
        try {
          await axios.post("http://localhost:5000/user/session/paymentverification", {
            userId: dataset._id,
            name: name,
            email: email,
            phoneNumber: phoneNumber,
            appointmentTime: dropdownValue,
            appointmentDate: appointmentDate,
            appointmentType: selectedWay,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });
          window.alert("Session Booked Successfully");
          window.open("/user", "_self");
        } catch (error) {
          console.log(error);
        }
        },
      prefill: {
        name: name,
        email: email,
        contact: phoneNumber,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectedway = (value) => {
    setSelectedWay(value);
    setIsClicked(true);
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
          <form onSubmit={checkoutHandler}>
            <label htmlFor="name" className="label-input-login">
              Name:
            </label>
            <input
              id="name"
              className="login-input"
              autoComplete="off"
              type="text"
              placeholder=" "
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
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
                      handleOptionSelect("12pm - 12:30pm", "12pm - 12:30pm")
                    }
                  >
                    12pm - 12:30pm
                  </div>
                  <div
                    className="option2"
                    onClick={() =>
                      handleOptionSelect("12:30pm - 1:00pm", "12:30pm - 1:00pm")
                    }
                  >
                    12:30pm - 1:00pm
                  </div>
                  <div
                    className="option3"
                    onClick={() =>
                      handleOptionSelect("1pm - 1:30pm", "1pm - 1:30pm")
                    }
                  >
                    1pm - 1:30pm
                  </div>
                  <div
                    className="option4"
                    onClick={() =>
                      handleOptionSelect("1:30pm - 2:00pm", "1:30pm - 2:00pm")
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
              <div
                className={`chat1 ${isClicked ? "" : " selected"}`}
                onClick={() => handleSelectedway("chat1")}
              >
                <img src={chat} alt="" style={{ margin: " 0 0.4rem " }} />
                Chat
                <img src={rup} alt="" style={{ margin: "0  0.4rem" }} />
              </div>
              <div
                className={`call  ${isClicked ? "" : " selected"}`}
                onClick={() => handleSelectedway("call")}
              >
                <img src={call} alt="" style={{ margin: " 0 0.4rem " }} />
                Call
                <img src={rup} alt="" style={{ margin: " 0 0.4rem " }} />
              </div>
              <div
                className={`meet  ${isClicked ? "" : " selected"}`}
                onClick={() => handleSelectedway("meet")}
              >
                <img src={meet} alt="" style={{ margin: " 0 0.4rem " }} />
                Google meet
                <img src={rup} alt="" style={{ margin: " 0 0.4rem " }} />
              </div>
            </div>
            <input
              id="appointtype"
              className="login-input"
              type="hidden"
              value={selectedWay}
              required
            />
            <button >
              Confirm Appointment
            </button>
          </form>
        </div>
      </div>
      <div className="back-img"></div>
    </>
  );
};

export default BookSession;
