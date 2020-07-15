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
    }, [dispatch, recipies.hasToUpdate])


    return (
        <div id="my-recipies">
            {
                recipies.hasLookedForData ?
                    (recipies.results.length > 0 ?
                        (recipies.results.map(recipie => (
                            <Recipie data={recipie} key={recipie.id} />
                        ))) : (
                            <div style={{width: "100%",textAlign: "center",}}>
                                <a
                                    href="/newRecipie"
                                    style={{ color: "#ff126c" }}
                                >
                                        Aún no tienes recetas! <br />
                                    Haz click aquí para empezar a agregar!
                                </a>
                            </div>

                        )
                    ) :
                    <Loading />
            }
        </div>
    )
}

export default MyRecipies
