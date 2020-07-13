import React from 'react'
import Recipie from './Recipie'
import { useDispatch, useSelector } from 'react-redux'
import { getMyRecipies } from '../redux/recipiesDucks'
import Loading from '../components/Loading'

const MyRecipies = () => {

    const recipies = useSelector(store => store.recipie)
    const dispatch = useDispatch();
    
    React.useEffect(() => {
        dispatch(getMyRecipies());
    },[dispatch, recipies.hasToUpdate])


    return (
        <div id="my-recipies">
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
    )
}

export default MyRecipies
