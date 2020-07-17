import React from 'react'
import '../public/css/LastSearches.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'



const LastSearches = (props) => {

    const { activeSearch, searchEvent, setSearches, searches } = props;
    
    const deleteSearchedElement = (e,elem) => {
        const index = searches.indexOf(elem.trim());
        console.log("index:" ,index)
        console.log("searches sin borrar:" ,searches)
        if(index !== -1){
            searches.splice(elem,1);
            console.log("borrado:" ,index)
        }
        console.log("searches borrados:" ,searches)
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
        <div id="last-searches" className={activeSearch ? "active p-4" : "p-4"}>
            <label className="pb-2">Últimas búsquedas</label>
            <div className="list-group">
                {
                    searches.map((search) => (
                        <div className="last-searches-item" style={{position:"relative"}}>
                            <a href="#" className="list-group-item list-group-item-action" key={search}>{search}</a>
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
