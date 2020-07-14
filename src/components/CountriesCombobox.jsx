import React from 'react'
import { languageTranslate } from '../helpers/countries'
import {chooseACountryText} from '../helpers/texts'
import '../public/css/CountriesCombobox.css'

const CountriesCombobox = (props) => {

    var isoCountriesLanguages = require('iso-countries-languages');

    var countries = isoCountriesLanguages.getCountries(languageTranslate());
    const setState = props.setState;
    const state = props.state;

    React.useEffect(() => {
        loadCountries();
    }, []);

    const loadCountries = () => {
        var arrayOfCountries = [];
        for (var n in countries) {
            var val = countries[n];// value where key is n
            var data = { key: n, value: val }
            arrayOfCountries.push(data);
        }

        return (
            <>
                {
                    arrayOfCountries.map(country => (
                        <option value={country.value} key={country.key}>{country.value}</option>
                    ))
                }
            </>

        )
    }

    return (
        <>
            <input 
                id="search-select-country" 
                list="select-country" 
                name="browser" 
                placeholder={chooseACountryText()} 
                onChange={e => setState({ ...state, country: e.target.value })}
            />
            <datalist
                className="mdb-select md-form" searchable="Search here.."
                id="select-country"
                onChange={e => setState({ ...state, country: e.target.value })}
            >
                {
                    loadCountries()
                }
            </datalist >
        </>
    )
}

export default CountriesCombobox
