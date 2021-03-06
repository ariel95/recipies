import React from 'react'
import TopNavbar from './TopNavbar';
import Recipie from './Recipie'
import { useDispatch, useSelector } from 'react-redux'
import { getRecipies, getMoreRecipies } from '../redux/recipiesDucks'
import Loading from './Loading';
import MoreButton from './MoreButton';
import { clickHereAndBeTheFirstInAddOneText, thereIsNotARecipieYetText } from '../helpers/texts';

const Home = () => {

    const recipies = useSelector(store => store.recipie)
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getRecipies());

    }, [recipies.hasToUpdate, dispatch])

    const moreRecipies = () => {
        dispatch(getMoreRecipies());
    }

    return (
        <>
            <TopNavbar />
            <div id="home">
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
                            :
                            (
                                <div style={{ width: "100%", textAlign: "center", marginTop: "50px"}}>
                                    <a
                                        href="/newRecipie"
                                        style={{ color: "#ff126c" }}
                                    >
                                        {thereIsNotARecipieYetText()} <br />
                                        {clickHereAndBeTheFirstInAddOneText()}
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
