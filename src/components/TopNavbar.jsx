import React from 'react'
import '../public/css/TopNavbar.css'

import {withRouter} from 'react-router-dom'

const TopNavbar = (props) => {

    const defaultContent = () => {
        return (
            <a className="navbar-brand" href="/">
                <img src="/docs/4.5/assets/brand/bootstrap-solid.svg" width="30" height="30" className="d-inline-block align-top" alt="" loading="lazy" />
                    Recipies
            </a>
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
