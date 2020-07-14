import React from 'react'
import {languageTranslate} from '../helpers/countries'

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
                        <option value={country.key} key={country.key}>{country.value}</option>
                    ))
                }
            </>

        )
    }

    return (
        <select
            className="custom-select"
            id="inputGroupSelect01"
            onChange={e => setState({ ...state, country: e.target.value })}
        >
            <option defaultValue>Choose...</option>
            {
                loadCountries()
            }
        </select>
    )
}

export default CountriesCombobox
