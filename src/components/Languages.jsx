import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import spanish from '../public/icons/spanish.ico'
import english from '../public/icons/english.ico'
import dutch from '../public/icons/dutch.ico'

const Languages = () => {
    return (
        <div id="languages" className="btn-group dropleft">
            <button className="btn-actions" data-toggle="dropdown">
                <FontAwesomeIcon icon={faEllipsisV} />
            </button>

            <div className="dropdown-menu">
                <button
                    className="dropdown-item"
                    type="button"
                    // onClick={() => spanish()}
                >
                    <img src={spanish} alt="" />
                    <span style={{ marginLeft: "15px" }}>Spanish</span>
                </button>
                <button
                    className="dropdown-item"
                    type="button"
                    // onClick={() => english()}
                >
                    <img src={english} alt="" />
                    <span style={{ marginLeft: "15px" }}>English</span>
                </button>
                <button
                    className="dropdown-item"
                    type="button"
                    // onClick={() => dutch()}
                >
                    <img src={dutch} alt="" />
                    <span style={{ marginLeft: "15px" }}>Dutch</span>
                </button>
            </div>
        </div>
    )
}

export default Languages
