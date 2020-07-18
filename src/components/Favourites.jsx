import React from 'react'
import TopNavbar from './TopNavbar';
import Recipie from './Recipie'
import { useDispatch, useSelector } from 'react-redux'
import { getFavouritesRecipies } from '../redux/recipiesDucks'
import Loading from './Loading';

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
                                <div style={{ width: "100%", textAlign: "center", }}>
                                    <a
                                        href="/"
                                        style={{ color: "#ff126c" }}
                                    >
                                        ¡Aún no se tienes recetas favoritas! <br />
                                        ¡Haz click aquí para explorar!
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
