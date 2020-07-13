import React from 'react'
import '../public/css/TopNavbar.css'
import { withRouter } from 'react-router-dom'
import Languages from '../components/Languages'

const TopNavbar = (props) => {

    const defaultContent = () => {
        return (
            <>
                <a className="navbar-brand" href="/">
                    {/* <img src={logo} width="30" height="30" className="d-inline-block align-top" alt="" loading="lazy" /> */}
                    Recipies
            </a>
                <Languages />
            </>
        )
    }

    return (
        <nav id="top-navbar" className="navbar navbar-light bg-light top-navbar px-4">
            {props.children ? (
                props.children

            ) : (
                    defaultContent()
                )
            }
        </nav >
    )
}

export default withRouter(TopNavbar)
