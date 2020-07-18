import React from 'react'
import Recipie from './Recipie'
import { useDispatch, useSelector } from 'react-redux'
import { getSearchedRecipies } from '../redux/recipiesDucks'
import Loading from './Loading';
// import MoreButton from './MoreButton';
import TopNavbar from './TopNavbar';
import '../public/css/Search.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import {startToSearchRecipiesText, searchText, noResultsForTheSearchText} from '../helpers/texts'
// import Filters from './Filters';
import LastSearches from './LastSearches';

const Search = () => {

    const [search, setSearch] = React.useState("");
    const recipies = useSelector(store => store.recipie)
    const dispatch = useDispatch();
    const [activeSearch, setActiveSearch] = React.useState(true)
    const searches = localStorage.getItem('searches') ? localStorage.getItem('searches').split(",") : [];

    React.useEffect(() => {
        document.getElementById('search-input').focus();
    }, [])

    // const moreRecipies = () => {
    //     dispatch(getMoreRecipies(search));
    // }

    const searchEvent = (s) => {
        
        const index = searches.indexOf(search.trim());
        if(index !== -1){
            searches.splice(index,1);
        }
        searches.push(search.trim());
        if(searches.length >= 11){
            searches.splice(0,searches.length-11)
        }
        localStorage.setItem("searches",searches);
        document.getElementById('search-input').blur();
        setActiveSearch(false)
        dispatch(getSearchedRecipies(search.trim()));
    }

    const searchingEvent = (s) => {    
        const index = searches.indexOf(s.trim());
        if(index !== -1){
            searches.splice(index,1);
        }
        searches.push(s.trim());
        if(searches.length >= 11){
            searches.splice(0,searches.length-11)
        }
        localStorage.setItem("searches",searches);
        document.getElementById('search-input').blur();
        setActiveSearch(false)
        dispatch(getSearchedRecipies(s.trim()));
    }

    const onEnter = (e) => {
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if (keycode === 13) {
            searchEvent();
        }
        else if(keycode === 27){
            document.getElementById('search-input').blur();
            setActiveSearch(false)
        }
    }

    const onClickSearchIcon = () => {
        setActiveSearch(false)
        dispatch(getSearchedRecipies(search));
    }

    return (
        <>
            <TopNavbar>
                {
                    activeSearch && 
                    <button className="btn-default"  onClick={() => setActiveSearch(false)} >
                        <FontAwesomeIcon icon={faChevronLeft}/>
                    </button>
                }
                <div id="search">
                    <input
                        id="search-input"
                        className="form-control"
                        value={search}
                        placeholder={searchText()}
                        onKeyUp={onEnter}
                        onChange={(e) => setSearch(e.target.value)}
                        onFocus={() => setActiveSearch(true)}
                    />
                    <FontAwesomeIcon
                        onClick={() => onClickSearchIcon()} 
                        style={{
                            position: "absolute",
                            right: "2rem",
                            top: "1.3rem",
                            cursor: "pointer"
                        }}
                        icon={faSearch}
                    />

                </div>
            </TopNavbar>
            {/* <Filters activeSearch={activeSearch} searchEvent={searchEvent}/> */}
            <LastSearches 
                activeSearch={activeSearch} 
                searchEvent={searchingEvent} 
                setSearch={setSearch} 
                searches={searches}
            />
            {
                !activeSearch && (
                    recipies.loading ? (
                        <Loading />
                    ) : (
                    recipies.results.length > 0 ?
                        recipies.results.map(recipie => (
                            <Recipie data={recipie} key={recipie.id} />
                        ))
                        :
                        (
                            
                            <div style={{ width: "100%", textAlign: "center",  marginTop: "25px" }}>
                                <span
                                    style={{ color: "#ff126c" }}
                                >
                                    {
                                        !recipies.hasLookedForData ? 
                                            startToSearchRecipiesText()
                                        :
                                            noResultsForTheSearchText()
                                    }
                                    
                                </span>
                            </div>
                        )
                    )
                )

            }
        </>
    )
}

export default Search
