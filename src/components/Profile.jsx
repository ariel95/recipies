import React from 'react'
import TopNavbar from './TopNavbar'
import { useDispatch, useSelector } from 'react-redux'
import { signOutAction } from '../redux/userDucks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import {withRouter} from 'react-router-dom'
import MyRecipies from './MyRecipies'

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
                <span className="navbar-brand" onClick={onClickSignOut}>
                    <FontAwesomeIcon icon={faSignOutAlt} />
                </span>
            </TopNavbar>
            <div id="profile">
                <div>

                    <label>Name: </label><p>{user.user.displayName}</p>
                    <label>Email: </label><p>{user.user.email}</p>
                </div>
                <button 
                    className="btn btn-dark"
                    onClick={() => props.history.push("/EditProfile")}
                >Edit profile</button>
                <MyRecipies />
            </div>
        </>
    )
}

export default withRouter(Profile)
