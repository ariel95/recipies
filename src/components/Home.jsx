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
    },[recipies.hasLookedForData, recipies.hasToUpdate ,dispatch])

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
                        <Loading />
                }
            </div>
        </>

    )
}

export default Home
