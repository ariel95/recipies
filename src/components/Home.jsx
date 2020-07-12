import React from 'react'
import TopNavbar from './TopNavbar';
import Recipie from './Recipie'
import { useDispatch, useSelector } from 'react-redux'
import { getRecipies } from '../redux/recipiesDucks'

const Home = () => {

    const recipies = useSelector(store => store.recipie)
    const dispatch = useDispatch();
    
    React.useEffect(() => {
        dispatch(getRecipies());
        // console.log("Recipies: ",recipies);
        // console.log("Recipies.results: ", recipies.results);
    },[recipies.hasLookedForData, dispatch])

    return (
        <>
            <TopNavbar />
            <div id="home">
                {
                    recipies.hasLookedForData ? 
                        ( recipies.results.length > 0 ? 
                            (recipies.results.map(recipie => (
                                <Recipie data={recipie} key={recipie.id} />
                            ))): (<div>No data</div>)
                        ) : 
                        <div>Cargando...</div>
                }
            </div>
        </>

    )
}

export default Home
