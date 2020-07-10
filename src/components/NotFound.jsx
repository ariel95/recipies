import React from 'react'
import '../public/css/NotFound.css'
import { withRouter } from 'react-router-dom'

const NotFound = (props) => {
    return (
        <div id="not-found" className="portada">
            <div className="text">
                <h1>Ups! Page not found!</h1>
                <div className="center">
                    <button
                        className="btn btn-light float-right mr-3 mt-3"
                        onClick={() => window.history.back()}
                    >
                        Go back
                </button>
                    <button
                        className="btn btn-light float-right mr-3 mt-3"
                        onClick={() => props.history.push("/")}
                    >
                        Home
                </button>
                </div>

            </div>
        </div>
    )
}

export default withRouter(NotFound)
