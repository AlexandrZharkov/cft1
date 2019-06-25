import * as CountriesConstants from '../Constants/countriesConstants';

export function countriesReducer(state = {countries: [],is_loading:false},action) {
    switch (action.type) {

        case CountriesConstants.GET_COUNTRIES_PENDING:{
            state = { ...state, is_loading:true};
            break;
        }

        case CountriesConstants.GET_COUNTRIES_FULFILLED:{
            state = { ...state, is_loading:false, countries:action.payload.data};
            state.countries.push({
                "id":"unknown",
                "code":"UNKNOWN",
                "name":"НЕИЗВЕСТНО",
                "phoneInfo":{
                    "prefix":"+",
                    "minLength":12,
                    "maxLength":12,
                    "format":"+000000000000"
                }}
            );

            break;
        }

        case CountriesConstants.GET_COUNTRIES_REJECTED:{
            state = { ...state, is_loading:false, countries:action.payload.message};
            break;
        }

    }
    return state;
}