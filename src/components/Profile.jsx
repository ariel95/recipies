import React from 'react'
import TopNavbar from './TopNavbar'
import { useDispatch, useSelector } from 'react-redux'
import { signOutAction } from '../redux/userDucks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faEllipsisV, faPen } from '@fortawesome/free-solid-svg-icons'
import { withRouter } from 'react-router-dom'
import MyRecipies from './MyRecipies'
import '../public/css/Profile.css'
import { nameText, emailText, signOutText, editProfileText } from '../helpers/texts'

const Profile = (props) => {

    const dispatch = useDispatch();
    const user = useSelector(store => store.user)

    const onClickSignOut = () => {
        dispatch(signOutAction());
        props.history.push("/");
    }

    return (
        <>
            <TopNavbar>
                <span className="navbar-brand user-email">
                    {/* <img src="/docs/4.5/assets/brand/bootstrap-solid.svg" width="30" height="30" className="d-inline-block align-top" alt="" loading="lazy" /> */}
                    {user.user.email}
                </span>
                <div className="actions">
                    <div className="btn-group dropleft">
                        <button className="btn-actions" data-toggle="dropdown">
                            <FontAwesomeIcon icon={faEllipsisV} />
                        </button>

                        <div className="dropdown-menu">
                            <button
                                className="dropdown-item"
                                type="button"
                                onClick={() => props.history.push("/EditProfile")}
                            >
                                <FontAwesomeIcon icon={faPen} />
                                <span style={{marginLeft:"15px"}}>{editProfileText()}</span>
                            </button>
                            <button
                                className="dropdown-item"
                                type="button"
                                onClick={onClickSignOut}
                            >
                                <FontAwesomeIcon icon={faSignOutAlt} />
                                <span style={{marginLeft:"15px"}}>{signOutText()}</span>
                            </button>
                        </div>
                    </div>
                </div>
                
            </TopNavbar>
            <div id="profile">
                <div className="card" width="400px">
                
                    <div className="card-body">
                        <form>
                            <div className="main-profile-picture">
                                <img className="card-img-top" width="100px" src={user.user.photoURL} alt=""></img>
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">{nameText()}</label>
                                <label 
                                    id="name" 
                                    type="text" 
                                    style={{display: "block",
                                            borderBottom: "1px solid #e1e1e1",
                                            color: "#000000b5"}}
                                >
                                    {user.user.displayName}
                                </label>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">{emailText()}</label>
                                <label 
                                    id="email" 
                                    type="text"
                                    style={{display: "block",
                                            borderBottom: "1px solid #e1e1e1",
                                            color: "#000000b5"}}
                                >
                                        {user.user.email}
                                </label>

                            </div>
                        </form>
                    </div>
                </div>
                
                <MyRecipies />
            </div>
        </>
    )
}

export default withRouter(Profile)
