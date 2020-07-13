import React from 'react'
import TopNavbar from './TopNavbar'
import { useDispatch, useSelector } from 'react-redux'
import { signOutAction } from '../redux/userDucks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faEllipsisV, faPen } from '@fortawesome/free-solid-svg-icons'
import { withRouter } from 'react-router-dom'
import MyRecipies from './MyRecipies'
import '../public/css/Profile.css'

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
                <span className="navbar-brand">
                    {/* <img src="/docs/4.5/assets/brand/bootstrap-solid.svg" width="30" height="30" className="d-inline-block align-top" alt="" loading="lazy" /> */}
                    {user.user.displayName}
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
                                <span style={{marginLeft:"15px"}}>Edit profile</span>
                            </button>
                            <button
                                className="dropdown-item"
                                type="button"
                                onClick={onClickSignOut}
                            >
                                <FontAwesomeIcon icon={faSignOutAlt} />
                                <span style={{marginLeft:"15px"}}>Sign out</span>
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
                                <label htmlFor="name">Name</label>
                                <input id="name" type="text" value={user.user.displayName} readOnly disabled />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input id="email" type="text" value={user.user.email} readOnly disabled />
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
