import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addRecipie } from '../redux/recipiesDucks'
import initialRecipiesData from '../models/Recipies'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faCheck } from '@fortawesome/free-solid-svg-icons'
import { withRouter } from 'react-router-dom'
import TopNavbar from '../components/TopNavbar'
import {numberOfServingsText, newRecipieText, nameText, descriptionText, countryOfOriginText, cookingTimeInMinutesText, ingredientsText } from '../helpers/texts'
import ImageUpload from './ImageUpload'
import CountriesCombobox from './CountriesCombobox'
import LoadingBlocked from '../components/LoadingBlocked'
import Recipie from './Recipie'

const NewRecipie = (props) => {

    const dispatch = useDispatch();
    const { loading, redirect } = useSelector(store => store.recipie);
    const [recipie, setRecipie] = React.useState(initialRecipiesData);
    const [image, setImage] = React.useState(null);


    React.useEffect(() => {
        if(redirect){
            window.location.href = "/";
        }
    }, [redirect])


    const addRecipieSubmit = (e) => {
        e.preventDefault();

        if (!recipie.name.trim()) {
            console.log("name vaciio")
            return
        }
        if (!recipie.description.trim()) {
            console.log("description vaciio")
            return
        }
        console.log("recipie enviado")
        dispatch(addRecipie(recipie, image));

    }



    return (
        <>
            <TopNavbar>
                <FontAwesomeIcon icon={faChevronLeft} onClick={() => props.history.goBack()} />
                <span className="navbar-brand" >
                    {newRecipieText()}
                </span>

                {
                    // !loading ? (
                        <FontAwesomeIcon icon={faCheck} onClick={addRecipieSubmit} />
                    // ) : (
                    //         <div className="spinner-border" style={{ width: "25px", height: "25px" }} role="status">
                    //             <span className="sr-only">Loading...</span>
                    //         </div>
                    //     )
                }

            </TopNavbar>
            <div id="new-recipie">
                <ImageUpload setImage={setImage} />
                <form onSubmit={addRecipieSubmit} className="col-12 row" style={{ margin: "auto", marginTop: "25px" }}>
                    <div className="form-group col-xs-12 col-md-6 col-lg-4">
                        <label htmlFor="name" className="info">{nameText()}</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            aria-describedby="emailHelp"
                            value={recipie.name}
                            onChange={e => setRecipie({ ...recipie, name: e.target.value })}
                        />
                        <div className="invalid-feedback">
                            This field is necesary
                        </div>
                    </div>
                    <div className="form-group col-xs-12 col-md-6 col-lg-4">
                        <label htmlFor="description" className="info">{descriptionText()}</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            value={recipie.description}
                            onChange={e => setRecipie({ ...recipie, description: e.target.value })}
                        />
                    </div>
                    <div className="form-group col-xs-12 col-md-6 col-lg-4">
                        <label htmlFor="country" className="info">{countryOfOriginText()}</label>
                        <CountriesCombobox state={recipie} setState={setRecipie} />
                    </div>
                    <div className="form-group col-xs-12 col-md-6 col-lg-4">
                        <label htmlFor="cookingTime" className="info">{cookingTimeInMinutesText()}</label>
                        <input
                            type="number"
                            className="form-control"
                            id="cookingTime"
                            value={recipie.cookingTimeInMinutes === 0 ? "" : recipie.cookingTimeInMinutes}
                            onChange={e => setRecipie({ ...recipie, cookingTimeInMinutes: e.target.value })}
                        />
                    </div>
                    <div className="form-group col-xs-12 col-md-6 col-lg-4">
                        <label htmlFor="numberOfServings" className="info">{numberOfServingsText()}</label>
                        <input
                            type="number"
                            className="form-control"
                            id="numberOfServings"
                            value={recipie.numberOfServings === 0 ? "" : recipie.numberOfServings}
                            onChange={e => setRecipie({ ...recipie, numberOfServings: e.target.value })}
                        />
                    </div>
                    {/* {
                        recipie.ingredients.length === 0 ? (
                            <div className="form-group col-xs-12 col-md-6 col-lg-4">
                                <label htmlFor="cookingTime" className="info">{ingredientsText()}</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="cookingTime"
                                    value={recipie.cookingTimeInMinutes === 0 ? "" : recipie.cookingTimeInMinutes}
                                    onChange={e => setRecipie({ ...recipie, cookingTimeInMinutes: e.target.value })}
                                />
                            </div>
                        ) : (
                            <div className="form-group col-xs-12 col-md-6 col-lg-4">
                                <label htmlFor="cookingTime" className="info">{ingredientsText()}</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="cookingTime"
                                    value={recipie.cookingTimeInMinutes === 0 ? "" : recipie.cookingTimeInMinutes}
                                    onChange={e => setRecipie({ ...recipie, cookingTimeInMinutes: e.target.value })}
                                />
                            </div>
                        )

                    } */}
                    {/* <div className="form-group col-xs-12 col-md-6 col-lg-4">
                        <label htmlFor="cookingTime" className="info">{ingredientsText()}</label>
                        <input
                            type="number"
                            className="form-control"
                            id="cookingTime"
                            value={recipie.cookingTimeInMinutes === 0 ? "" : recipie.cookingTimeInMinutes}
                            onChange={e => setRecipie({ ...recipie, cookingTimeInMinutes: e.target.value })}
                        />
                    </div> */}
                    <button type="submit" hidden></button>
                </form>
                {
                    loading && (
                        <LoadingBlocked />
                    ) 
                }

            </div>
        </>

    )
}

export default withRouter(NewRecipie)
