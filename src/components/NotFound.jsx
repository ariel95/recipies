import React from 'react'
import '../public/css/NotFound.css'
import { withRouter } from 'react-router-dom'
import {pageNotFoundText, homeText, goBackText} from '../helpers/texts'

const NotFound = (props) => {
    return (
        <div id="not-found" className="portada">
            <div className="text">
                <h1>{pageNotFoundText()}</h1>
                <div className="center">
                    <button
                        className="btn btn-light float-right mr-3 mt-3"
                        onClick={() => window.history.back()}
                    >
                        {goBackText()}
                </button>
                    <button
                        className="btn btn-light float-right mr-3 mt-3"
                        onClick={() => window.location.href = "/"}
                    >
                        {homeText()}
                </button>
                </div>

            </div>
        </div>
    )
}

export default withRouter(NotFound)
