
import "./App.css";
import { useSelector } from 'react-redux';
import axios from 'axios';
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import UserFeed from "./UserFeed";
import BookSession from "./components/BookSession";

axios.defaults.withCredentials = true;

function App() {
  const {user}=useSelector((state)=>{return state})

  return (

    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          { user.isloggedin===true? <Route exact path="/user/:id" element={<UserFeed />} />:null}
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/Register" element={<Register />} />
          <Route exact path="/user/:id/Session" element={<BookSession />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
