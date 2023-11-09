import React from 'react'
import Logo from '/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import {setdata,setisLoggedin} from '../reducers/userSlice'
import axios from 'axios'

const Navbar = () => {
  const {user}=useSelector((state)=>{return state})
  const dispatch=useDispatch()

  const logouthandler= async()=>{
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/logout`);
    dispatch(setisLoggedin(false))
    dispatch(setdata(""))
    window.open("/", "_self");
  }
  const logout = async() => {
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/logout`);
    dispatch(setisLoggedin(false))
    dispatch(setdata(""))
    window.open("/", "_self");
  };
  return (
    <div className='nav'>
        <div className={`${user.isloggedin ? "Logo " : ""}`}>
        <a href="/" >
          <img src={Logo} className="logo" alt="logo" />
        </a>
      </div>
      <div className='child-2'>
        <div className='children'>
            <a href="#About" style={{textDecoration: "none" , color: "black"}}>
              About
              </a> 
        </div>
        <div className={ `children ${user.isloggedin ? " " : "Logo"}`}>
          <a href="#Services" style={{textDecoration: "none" , color: "black"}}>
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
  )
}

export default Navbar