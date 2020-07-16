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

const Search = () => {

    const [search, setSearch] = React.useState("");
    const recipies = useSelector(store => store.recipie)
    const dispatch = useDispatch();
    const [activeSearch, setActiveSearch] = React.useState(true)

    React.useEffect(() => {
        document.getElementById('search-input').focus();
    }, [])

    // const moreRecipies = () => {
    //     dispatch(getMoreRecipies(search));
    // }

    const searchEvent = () => {
        document.getElementById('search-input').blur();
        setActiveSearch(false)
        dispatch(getSearchedRecipies(search));
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
                    activeSearch && <FontAwesomeIcon icon={faChevronLeft} onClick={() => setActiveSearch(false)} />
                }

                <div id="search">
                    <input
                        id="search-input"
                        className="form-control"
                        placeholder={searchText()}
                        onKeyUp={onEnter}
                        onChange={(e) => setSearch(e.target.value)}
                        onFocus={() => setActiveSearch(true)}
                    // onBlur={() => setActiveSearch(false)}
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
            <div id="filters" className={activeSearch ? "active" : ""}>
                <p>Hola soy un filtro</p>
                <p>Hola soy otro filtro</p>
                <p>Hola me llamo filtro</p>
                <p>Holis que onda amigo soy un filtro</p>
            </div>
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
