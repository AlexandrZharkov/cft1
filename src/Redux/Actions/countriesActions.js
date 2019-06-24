import axios from 'axios'

import {GET_COUNTRIES} from "../Constants/countriesConstants";

export function getCountries() {
    return {
        type: GET_COUNTRIES,
        action: axios.get('https://koronapay.com/online/api/countries')
    }
}