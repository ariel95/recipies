import React from 'react'
import TopNavbar from './TopNavbar';
import Recipie from './Recipie'
import { useDispatch, useSelector } from 'react-redux'
import { getRecipies } from '../redux/recipiesDucks'
import Loading from './Loading';

const Home = () => {

    const recipies = useSelector(store => store.recipie)
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getRecipies());
    }, [recipies.hasToUpdate, dispatch])

    return (
        <>
            <TopNavbar />
            <div id="home">
                {
                    recipies.hasLookedForData ?
                        (recipies.results.length > 0 ?
                            (recipies.results.map(recipie => (
                                <Recipie data={recipie} key={recipie.id} />
                            ))) :
                            (
                                <div style={{width: "100%",textAlign: "center",}}>
                                <a
                                    href="/newRecipie"
                                    style={{ color: "#ff126c" }}
                                >
                                        Aún no se publicaron recetas! <br />
                                    Haz click aquí y se el primero en agregar!
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

export default Home
