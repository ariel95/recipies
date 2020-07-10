import React from 'react'
import '../public/css/DownNavbar.css'

const DownNavbar = () => {
  return (
    <nav id="down-navbar" className="navbar fixed-bottom navbar-light bg-light down-navbar">
      
      <div class="d-flex justify-content-around">
        <a className="navbar-brand" href="/">Home</a>
        <a className="navbar-brand" href="/akjsdlkj">Not</a>
        <a className="navbar-brand" href="/myRecipies">My recipies</a>
        <a className="navbar-brand" href="/profile">Profile</a>
        
      </div>
    </nav>
  )
}

export default DownNavbar
