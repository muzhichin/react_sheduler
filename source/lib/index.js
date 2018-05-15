import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import Calendar from './UI/calendar'

import sass from "../styles/style.scss";
import css from "../styles/taskman.css";

// localStorage.clear()
// ReactDOM.render(
//     <Provider store={store} storeEvent={storeEvent}>
//         <Calendar/>
//     </Provider>,
//     document.getElementById('root')
// )

ReactDOM.render(
    <Calendar/>,
    document.getElementById('root')
)

require('./api.js')
// require('./google_calendar3.js')


import {handleClientLoad} from './google_calendar3'

handleClientLoad()

// import api from './api'
// import google from './google_calendar3'
//
// api()
// google()