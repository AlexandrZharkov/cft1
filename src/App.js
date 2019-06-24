import React from 'react';
import {Provider} from 'react-redux'

import store from './store'
import 'antd/dist/antd.css'

import PhoneInput from './Components/PhoneInput'

function App() {
    return (
        <Provider store={store}>
            <PhoneInput/>
        </Provider>

    );
}

export default App;
