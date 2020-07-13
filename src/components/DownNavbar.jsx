import React from 'react'
import '../public/css/DownNavbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faSearch, faHeart, faPlus, faUser } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'

const DownNavbar = () => {

  const [homeSelected, setHomeSelected] = React.useState(false);
  const [searchSelected, setSearchSelected] = React.useState(false);
  const [newRecipieSelected, setNewRecipieSelected] = React.useState(false);
  const [myRecipiesSelected, setMyRecipiesSelected] = React.useState(false);
  const [profileSelected, setProfileSelected] = React.useState(false);

  const {user} = useSelector(store => store.user)

  React.useEffect(() => {
    const url = window.location.pathname;
      switch(url){
        case "/":
          setHomeSelected(true);
          break;
        case "/search":
          setSearchSelected(true);
          break;
        case "/newRecipie":
          setNewRecipieSelected(true);
          break;
        case "/myRecipies":
          setMyRecipiesSelected(true);
          break;
        case "/profile":
          setProfileSelected(true);
          break;
        default:
          break; 
      }
  },[])

  return (
    <nav id="down-navbar" className="navbar fixed-bottom navbar-light bg-light down-navbar">
      <div className="d-flex justify-content-around">
        <div className="flex-item">
          <a className={homeSelected?"link navbar-brand flex-item selected":"link navbar-brand flex-item"} href="/">
            <FontAwesomeIcon icon={faHome} />
          </a>
        </div>
        <div className="flex-item">
          <a className={searchSelected?"link navbar-brand flex-item selected":"link navbar-brand flex-item"} href="/search">
            <FontAwesomeIcon icon={faSearch} />
          </a>
        </div>
        <div className="flex-item">
          <a className={newRecipieSelected?"link navbar-brand flex-item selected":"link navbar-brand flex-item"} href="/newRecipie" >
            <FontAwesomeIcon icon={faPlus} />
          </a>
        </div>
        <div className="flex-item">
          <a className={myRecipiesSelected?"link navbar-brand flex-item selected":"link navbar-brand flex-item"} href="/myRecipies">
            <FontAwesomeIcon icon={faHeart} />
          </a>
        </div>
        <div className="flex-item">
          <a className={profileSelected?"link navbar-brand flex-item selected":"link navbar-brand flex-item"} href="/profile">
            {
              user ? (
                
                <img src={user.photoURL} style={{width: "25px", height: "25px", borderRadius: "50%", border: "2px solid"}} alt=""/>
              ) : (
                <FontAwesomeIcon icon={faUser} />
              )
            }
            
          </a>
        </div>
      </div>
    </nav>
  )
}

export default DownNavbar
