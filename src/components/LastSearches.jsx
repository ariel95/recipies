import React from 'react'
import '../public/css/LastSearches.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { lastSearchesText, startToSearchRecipiesText } from '../helpers/texts'


const LastSearches = (props) => {

    const { activeSearch, searchEvent, setSearch, searches } = props;
    
    const [searchElements, setSearchElements] = React.useState(null)
    const [update, setUpdate] = React.useState(false)

    React.useEffect(() => {
        setSearchElements(
            searches.map((search) => (
                <div className="last-searches-item" style={{position:"relative"}} key={search}>
                    <a 
                        href="#" 
                        className="list-group-item list-group-item-action pl-4" 
                        onClick={() => onClickSearch(search)}    
                    >{search}</a>
                    <button className="btn-default" onClick={(e) => deleteSearchedElement(e,search) }>
                        <FontAwesomeIcon icon={faTimes}/>
                    </button>
                </div>
            ))
        )
        setUpdate(false);
    },[searches,update])

    const deleteSearchedElement = (e,elem) => {
        const index = searches.indexOf(elem);
        console.log(index);
        console.log("sin borrar: ",searches)
        if(index !== -1){
            searches.splice(index,1);
            console.log("borrado: ",searches)
        }
        localStorage.setItem("searches",searches);
        console.log("final: ",searches)
        // removeElement(e.target);
        setUpdate(true);
    }

    const removeElement = (elem) => {
        if(!elem.classList.contains("last-searches-item"))
        {
            removeElement(elem.parentElement)
            return;
        }
        // elem.remove();
    }

    const onClickSearch = (s) => {
        setSearch(s);
        searchEvent(s);
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
                    searchElements
                }
            </div>
        </div>
    )
}

export default LastSearches
