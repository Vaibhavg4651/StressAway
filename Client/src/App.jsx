import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";
import UserFeed from "./UserFeed";
import BookSession from "./components/BookSession";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/Register" element={<Register />} />
          <Route exact path="/Session" element={<BookSession />} />
          <Route exact path="/User" element={<UserFeed />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
