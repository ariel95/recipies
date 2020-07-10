import React from 'react'
import TopNavbar from './TopNavbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faCheck } from '@fortawesome/free-solid-svg-icons'
import {withRouter} from 'react-router-dom'

const EditProfile = (props) => {
    return (
        <>
            <TopNavbar>
                <FontAwesomeIcon icon={faChevronLeft} onClick={() => props.history.goBack()} />
                <a className="navbar-brand" href="#">
                    <img src="/docs/4.5/assets/brand/bootstrap-solid.svg" width="30" height="30" className="d-inline-block align-top" alt="" loading="lazy" />
                    Edit profile
                </a>
                <FontAwesomeIcon icon={faCheck} onClick={() => console.log("save")} />

            </TopNavbar>
            <div id="edit-profile">
                Edit profile
            </div>
        </>

    )
}

export default withRouter(EditProfile)
