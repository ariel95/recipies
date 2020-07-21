import React from 'react'
import Recipie from './Recipie'
import { useDispatch, useSelector } from 'react-redux'
import { getMyRecipies, getMoreMyRecipies } from '../redux/recipiesDucks'
import Loading from '../components/Loading'
import MoreButton from '../components/MoreButton'
import {clickHereToAddOneText, thereIsNotARecipieYetText} from '../helpers/texts'

const MyRecipies = () => {

    const recipies = useSelector(store => store.recipie)
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getMyRecipies());
    }, [dispatch, recipies.hasToUpdate])

    const moreRecipies = () => {
        dispatch(getMoreMyRecipies());
    }

    return (
        <div id="my-recipies">
            {
                recipies.hasLookedForData ?
                    (recipies.results.length > 0 ?
                        <>
                            {
                                recipies.results.map(recipie => (
                                    <Recipie data={recipie} key={recipie.id} />
                                ))
                            }
                            {
                                !recipies.noMoreData &&
                                <MoreButton click={moreRecipies} loading={recipies.loading} />
                            }
                        </>
                        : (
                            <div style={{ width: "100%", textAlign: "center", marginTop:"50px"}}>
                                <a
                                    href="/newRecipie"
                                    style={{ color: "#ff126c" }}
                                >
                                    {thereIsNotARecipieYetText()} <br />
                                        {clickHereToAddOneText()}
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
