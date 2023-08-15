
import "./App.css";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import UserFeed from "./UserFeed";
import BookSession from "./components/BookSession";
import { useEffect , useState } from "react";
import {setdata,setisLoggedin} from './reducers/userSlice'
import Test from "./Test";
import Forgetpassword from "./components/Forgetpassword";

axios.defaults.withCredentials = true;

function App() {
  const dispatch=useDispatch()

  const {user}=useSelector((state)=>{return state})


  const getuser=async()=>{
    try{
      const res = await fetch("http://localhost:5000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      const data = await res.json();
      if (data.success === true) {
        dispatch(setisLoggedin(true));
        dispatch(setdata(data.user));
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getuser();
  }, []);
  

  return (

    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          { user.isloggedin===true? <Route exact path="/user" element={<UserFeed />} />:null}
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/Register" element={<Register />} />
          <Route exact path="/test" element={<Test />} />
          <Route exact path="/forgetPassword" element={<Forgetpassword />} />
          <Route exact path="/user/Session" element={<BookSession />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
