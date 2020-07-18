import React from 'react'
import '../public/css/LastSearches.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { lastSearchesText, startToSearchRecipiesText } from '../helpers/texts'


const LastSearches = (props) => {

    const { activeSearch, searchEvent, setSearches, searches } = props;
    
    const deleteSearchedElement = (e,elem) => {
        const index = searches.indexOf(elem.trim());
        if(index !== -1){
            searches.splice(elem,1);
        }
        localStorage.setItem("searches",searches);
        removeElement(e.target.parentElement);
    }

    const removeElement = (elem) => {
        if(!elem.classList.contains("last-searches-item"))
        {
            removeElement(elem.parentElement)
            return;
        }
        elem.remove();
    }

    return (
        <div id="last-searches" className={activeSearch ? "active" : ""}>
            {
                searches.length > 0 ?
                (
                    <label className="pb-2 pt-4 pl-4">{lastSearchesText()}</label>
                ) : (
                    <label className="pb-2 pt-4 pl-4">{startToSearchRecipiesText()}</label>
                )
            }
            
            <div className="list-group">
                {
                    searches.map((search) => (
                        <div className="last-searches-item" style={{position:"relative"}} key={search}>
                            <a href="#" className="list-group-item list-group-item-action pl-4">{search}</a>
                            <button className="btn-default" onClick={(e) => deleteSearchedElement(e,search) }>
                                <FontAwesomeIcon icon={faTimes}/>
                            </button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default LastSearches
