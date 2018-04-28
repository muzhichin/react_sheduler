import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import Calendar from './UI/calendar'
import {store, storeEvent} from "./store/index";
import sass from "../styles/style.scss";
import css from "../styles/taskman.css";

localStorage.clear()


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
