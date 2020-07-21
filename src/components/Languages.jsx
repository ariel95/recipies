import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortDown } from '@fortawesome/free-solid-svg-icons'
import spanish from '../public/icons/spanish.ico'
import english from '../public/icons/english.ico'
import dutch from '../public/icons/dutch.ico'
import {spanishText, englishText, dutchText} from '../helpers/texts'

const Languages = () => {

    const language = localStorage.getItem('language');

    const spanishClick = () => {
        localStorage.setItem('language', 'spanish'); 
        window.location.reload();   
    }
    const englishClick = () => {
        localStorage.setItem('language', 'english');
        window.location.reload();
    }
    const dutchClick = () => {
        localStorage.setItem('language', 'dutch');
        window.location.reload();
    }

    return (
        <div id="languages" className="btn-group dropleft">
            <button className="btn-actions" data-toggle="dropdown" style={{marginBottom:"5px"}}>
                {/* <FontAwesomeIcon icon={faEllipsisV} /> */}
                <FontAwesomeIcon icon={faSortDown} style={{marginRight:"10px", marginBottom:"1px"}}/>
                {
                    language === "spanish" && (<img src={spanish} alt="" />)
                }
                {
                    language === "dutch" && (<img src={dutch} alt="" />)
                }
                {
                    (language === "english" || language === null) && (<img src={english} alt="" />)
                }
            </button>

            <div className="dropdown-menu">
                <button
                    className="dropdown-item"
                    type="button"
                    onClick={() => spanishClick()}
                >
                    <img src={spanish} alt="" />
                    <span style={{ marginLeft: "15px" }}>{spanishText()}</span>
                </button>
                <button
                    className="dropdown-item"
                    type="button"
                    onClick={() => englishClick()}
                >
                    <img src={english} alt="" />
                    <span style={{ marginLeft: "15px" }}>{englishText()}</span>
                </button>
                {/* <button
                    className="dropdown-item"
                    type="button"
                    onClick={() => dutchClick()}
                >
                    <img src={dutch} alt="" />
                    <span style={{ marginLeft: "15px" }}>{dutchText()}</span>
                </button> */}
            </div>
        </div>
    )
}

export default Languages
