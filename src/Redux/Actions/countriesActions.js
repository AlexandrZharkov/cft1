import axios from 'axios'
import {GET_COUNTRIES} from "../Constants/countriesConstants";

export function getCountries() {
    return {
        type: GET_COUNTRIES,
        payload: axios.get('/api/countries')
    }
}