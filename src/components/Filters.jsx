import React from 'react'
import { countryOfOriginText, cookingTimeInMinutesText } from '../helpers/texts';
import '../public/css/Filters.css'

const Filters = (props) => {

    const {activeSearch, searchEvent} = props;

    const onSubmitFilters = (e) => {
        e.preventDefault()
        searchEvent();
    }

    return (
        <div id="filters" className={activeSearch ? "active" : ""}>
            <form onSubmit={onSubmitFilters} className="row p-3">
                <div className="form-group col-lg-4 col-md-6 col-sm-12 col-xs-12">
                    <label htmlFor="country">{countryOfOriginText()}</label>
                    <input id="country" type="text" />
                </div>
                <div className="form-group col-lg-4 col-md-6 col-sm-12 col-xs-12">
                    <label htmlFor="cooking-time">{cookingTimeInMinutesText()}</label>
                    <input id="cooking-time" type="text" />
                </div>
                <button type="submit" hidden></button>
            </form>
        </div>
    )
}

export default Filters
