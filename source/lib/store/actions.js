import C from './constants'
import {v4} from 'uuid'
import {orderFormElements} from "../UI/constants"

export const _tasks = (obj) => {
    // console.log(obj)
    let {EVENT_START, EVENT_NAME, EVENT_DESCRIPTION, EVENT_COLOR, EVENT_TYPE, EVENT_END} = obj
    let eventID = obj.eventID || null
    return ({
        type: C.SET_TASK,
        value: {
            data: {
                start: EVENT_START,
                end: EVENT_END
            },
            type: EVENT_TYPE,
            details: EVENT_DESCRIPTION,
            name: EVENT_NAME,
            id: eventID ? eventID : v4(),
            color: EVENT_COLOR
        }
    })
}


export const _modalHidden = (...arr) => dispatch => {
    for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i] === "boolean" && (arr[i] === true || arr[i] === false)) {
            dispatch({
                type: C.MODAL_HIDDEN,
                value: arr[i]
            })
        } else if (arr[i] !== null && typeof arr[i] === "object") {
            dispatch({
                type: C.MODAL_LIST,
                value: arr[i]
            })
        }

    }
}

export const _tempTask = (...arr) => dispatch => {

    arr.filter(i => {
        let str = Object.getOwnPropertyNames(i)[0]
        orderFormElements.includes(str) ? dispatch({
            type: C.TEMP_TASK,
            value: i
        }) : console.log("_tempTask - not arguments")
    })
}


export const _panelButton = (...arr) => dispatch => {
    for (let i = 0; i < arr.length; i++) {
        switch (arr[i]) {
            case true :
                dispatch({
                    type: C.PANEL_BUTTON,
                    value: true
                })
                break
            case false :
                dispatch({
                    type: C.PANEL_BUTTON,
                    value: false
                })
                break
            default :
                return console.log("_panelButton - not arguments")
        }
    }
}

export const _panelState = (state) => dispatch => {
    orderFormElements.includes(state) ? dispatch({
        type: C.PANEL_STATE,
        value: state
    }) : console.log("_panelState - not arguments")
}