import {SET_NOTIFICATION} from "../Constants/appConstants";

export function setNotification(type,message) {
    return {
        type: SET_NOTIFICATION,
        meta: {type, message}
    }
}