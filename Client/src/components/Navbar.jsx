import React from 'react'
import Logo from '/logo.png'

const Navbar = () => {
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
      <div className='child-3'>
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
      </div>
    </div>
  )
}

export default Navbar