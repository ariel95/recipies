import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addRecipie } from '../redux/recipiesDucks'
import initialRecipiesData from '../models/Recipies'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faCheck } from '@fortawesome/free-solid-svg-icons'
import { withRouter } from 'react-router-dom'
import TopNavbar from '../components/TopNavbar'
import { newRecipieText, nameText, descriptionText, countryOfOriginText, cookingTimeInMinutesText, ingredientsText } from '../helpers/texts'
import ImageUpload from './ImageUpload'

const NewRecipie = (props) => {

    const dispatch = useDispatch();
    const { loading } = useSelector(store => store.recipie);
    const [recipie, setRecipie] = React.useState(initialRecipiesData);
    const [image, setImage] = React.useState(null);

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
                    !loading ? (
                        <FontAwesomeIcon icon={faCheck} onClick={addRecipieSubmit} />
                    ) : (
                            <div className="spinner-border" style={{ width: "25px", height: "25px" }} role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        )
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
                        {/* <input
                            type="text"
                            className="form-control"
                            id="country"
                            value={recipie.country}
                            onChange={e => setRecipie({ ...recipie, country: e.target.value })}
                        /> */}
                        <select 
                            class="custom-select" 
                            id="inputGroupSelect01"
                            onChange={e => setRecipie({ ...recipie, country: e.target.value })}
                        >
                            <option selected>Choose...</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
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
                    <button type="submit" hidden></button>
                </form>
            </div>
        </>

    )
}

export default withRouter(NewRecipie)
