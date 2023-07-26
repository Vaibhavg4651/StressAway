import React, { useState } from "react";
import { useSelector, useDispatch} from "react-redux";
import arw from "../assets/uparrow.svg";
import chat from "../assets/chat.svg";
import call from "../assets/call.svg";
import meet from "../assets/meet.svg";
import rup from "../assets/rupee.svg";
import axios from "axios";
import Logo from '/logo.png'
import {setdata,setisLoggedin} from '../reducers/userSlice'


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

  const {user}=useSelector((state)=>{return state})
  const dispatch=useDispatch()

  const logouthandler= async()=>{
    await axios.get("http://localhost:5000/user/logout");
    dispatch(setisLoggedin(false))
    dispatch(setdata(""))
    window.open("/", "_self");
  }
  const logout = async() => {
    await axios.get("http://localhost:5000/logout");
    dispatch(setisLoggedin(false))
    dispatch(setdata(""))
    window.open("/", "_self");
  };

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
      <div className='nav'>
        <div className='Logo'>
        <a href="/" >
          <img src={Logo} className="logo" alt="logo" />
        </a>
      </div>
      <div className='child-2'>
        <div className='children'>
            <a href="/user#About" style={{textDecoration: "none" , color: "black"}}>
              About
              </a> 
        </div>
        <div className='children'>
          <a href="/user#Services" style={{textDecoration: "none" , color: "black"}}>
            Services
          </a>
        </div>
      </div>
      { user.isloggedin===true? <button value='Submit' onClick={user.userdata.googleId || user.userdata.facebookId ? logout : logouthandler} className='loginbtn'> <a href='' className= 'logintext' style={{color : "white"}}>
                Logout
              </a> </button> :<div className='child-3'>
        <div className='children'>
             <button className='loginbtn'>
              <a href='/Login' className= 'logintext' style={{color : "white"}}>
                Login
              </a>
            </button>
        </div>
        <div className='children'>
              <a href='/Register' className='logintext' style={{color : "#545454"}}> 
                Register 
              </a>
        </div>
      </div>}
    </div>
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
