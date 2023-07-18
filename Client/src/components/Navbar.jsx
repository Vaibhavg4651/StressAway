import React from 'react'
import Logo from '/logo.png'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {setdata,setisLoggedin} from '../reducers/userSlice'

const Navbar = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const logouthandler=()=>{
    dispatch(setisLoggedin(false))
    dispatch(setdata(""))
      navigate("/")
  }
  const {user}=useSelector((state)=>{return state})
  const logout = () => {
    window.open("http://localhost:5000/logout", "_self");
    dispatch(setisLoggedin(false))
    dispatch(setdata(""))
      navigate("/")
  };
  return (
    <div className='nav'>
        <div className='Logo'>
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
        <div className='children'>
          <a href="#Services" style={{textDecoration: "none" , color: "black"}}>
            Services
          </a>
        </div>
      </div>
      { user.isloggedin===true? <button value='Submit' onClick={user.userdata.provider ? logout : logouthandler} className='loginbtn'> <a href='' className= 'logintext' style={{color : "white"}}>
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