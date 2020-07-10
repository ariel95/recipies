import React from 'react'
import TopNavbar from './TopNavbar'
import { useDispatch, useSelector } from 'react-redux'
import { signOutAction } from '../redux/userDucks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import {withRouter} from 'react-router-dom'

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
                <a className="navbar-brand" href="#">
                    <img src="/docs/4.5/assets/brand/bootstrap-solid.svg" width="30" height="30" className="d-inline-block align-top" alt="" loading="lazy" />
                    {user.user.displayName}
                </a>
                <a className="navbar-brand" onClick={onClickSignOut}>
                    <FontAwesomeIcon icon={faSignOutAlt} />
                </a>
            </TopNavbar>
            <div id="profile">
                Profile with my recipies
            </div>
        </>
    )
}

export default withRouter(Profile)
