import React from 'react'
import ReactDOM from 'react-dom'
// import {Provider} from 'react-redux'
import Calendar from './UI/calendar'
import sass from "../styles/style.scss"
require('./logic/google_api_settings')

ReactDOM.render(
    <Calendar/>,
    document.getElementById('root')
)