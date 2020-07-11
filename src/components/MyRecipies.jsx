import React from 'react'
import Recipie from './Recipie'
import { useDispatch, useSelector } from 'react-redux'
import { getMyRecipies } from '../redux/recipiesDucks'

const MyRecipies = () => {

    const recipies = useSelector(store => store.recipie)
    const dispatch = useDispatch();
    
    React.useEffect(() => {
        dispatch(getMyRecipies());
    },[recipies.hasLookedForData, dispatch])


    return (
        <div id="my-recipies">
                {
                    recipies.hasLookedForData ? 
                        ( recipies.results.length > 0 ? 
                            (recipies.results.map(recipie => (
                                <Recipie data={recipie} key={recipie.uid} />
                            ))): (<div>No data</div>)
                        ) : 
                        <div>Cargando...</div>
                }
            </div>
    )
}

export default MyRecipies
