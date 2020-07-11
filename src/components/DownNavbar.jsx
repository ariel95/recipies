import React from 'react'
import '../public/css/DownNavbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faSearch, faHeart, faPlus, faUser } from '@fortawesome/free-solid-svg-icons'

const DownNavbar = () => {
  return (
    <nav id="down-navbar" className="navbar fixed-bottom navbar-light bg-light down-navbar">
      <div className="d-flex justify-content-around">
        <div className="flex-item">
          <a className="navbar-brand" href="/">
            <FontAwesomeIcon icon={faHome} />
          </a>
        </div>
        <div className="flex-item">
          <a className="navbar-brand flex-item" href="/search">
            <FontAwesomeIcon icon={faSearch} />
          </a>
        </div>
        <div className="flex-item">
          <a className="navbar-brand flex-item" href="/newRecipie">
            <FontAwesomeIcon icon={faPlus} />
          </a>
        </div>
        <div className="flex-item">
          <a className="navbar-brand flex-item" href="/myRecipies">
            <FontAwesomeIcon icon={faHeart} />
          </a>
        </div>
        <div className="flex-item">
          <a className="navbar-brand flex-item" href="/profile">
            <FontAwesomeIcon icon={faUser} />
          </a>
        </div>
      </div>
    </nav>
  )
}

export default DownNavbar
