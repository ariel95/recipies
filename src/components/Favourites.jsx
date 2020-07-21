import React from 'react'
import TopNavbar from './TopNavbar';
import Recipie from './Recipie'
import { useDispatch, useSelector } from 'react-redux'
import { getFavouritesRecipies } from '../redux/recipiesDucks'
import Loading from './Loading';
import { clickHereToStartToSearchText, thereIsNotARecipieYetText } from '../helpers/texts';

const Favourites = () => {

    const recipies = useSelector(store => store.recipie)
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getFavouritesRecipies());

    }, [recipies.hasToUpdate, dispatch])

    return (
        <>
            <TopNavbar />
            <div id="favourites">
                {
                    recipies.hasLookedForData ?
                        (recipies.results.length > 0 ?
                            <>
                                {
                                    recipies.results.map(recipie => (
                                        <Recipie data={recipie} key={recipie.id} />
                                    ))
                                }
                                
                            </>
                            :
                            (
                                <div style={{ width: "100%", textAlign: "center", marginTop:"50px"}}>
                                    <a
                                        href="/"
                                        style={{ color: "#ff126c" }}
                                    >
                                         {thereIsNotARecipieYetText()} <br />
                                        {clickHereToStartToSearchText()}
                                    </a>
                                </div>

                            )
                        ) :
                        <Loading />
                }
            </div>
        </>
    )
}

export default Favourites
