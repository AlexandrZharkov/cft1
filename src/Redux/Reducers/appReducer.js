import * as AppConstants from '../Constants/appConstants';
import { notification } from 'antd';

const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
        message,
        description,
        duration: 5,
        placement: 'bottomRight',
    });
};

export function appReducer(state = {notification: []},action) {
    switch (action.type) {
        case AppConstants.SET_NOTIFICATION:{
            state = { ...state, };
            openNotificationWithIcon(action.meta.type,action.meta.message);
            break;
        }
    }
    return state;
}