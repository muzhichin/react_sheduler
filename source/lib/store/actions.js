import C from './constants'
import {v4} from 'uuid'
import {orderFormElements} from "../UI/constants"

export const _tasks = (obj) => {
    let {EVENT_START, EVENT_NAME, EVENT_DESCRIPTION, EVENT_COLOR, EVENT_TYPE, EVENT_END} = obj
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
            id: v4(),
            color: EVENT_COLOR
        }
    })
}


export const _modalHidden = (...arr) => dispatch => {
    for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i] === "boolean" && (arr[i] === true || arr[i] === false)) {
            dispatch({
                type: C.MODAL_OPEN,
                value: arr[i]
            })
        } else if (Array.isArray(arr[i]) || arr[i] === null) {
            dispatch({
                type: C.EVENT_DISPLAY,
                value: arr[i]
            })
        } else if (typeof arr[i] === "string") {
            dispatch({
                type: C.MODAL_SET_DATA,
                value: arr[i]
            })
        }

    }
}

export const _tempTask = (...arr) => dispatch => {
    const arrState = ["dataStart", "dataEnd", "type", "details", "name", "color"]
    arr.filter(i => {
        let str = Object.getOwnPropertyNames(i)[0]
        orderFormElements.includes(str) ? dispatch({
            type: C.TEMP_TASK,
            value: i
        }) : console.log("no str")
    })
}


export const _modalState = (...arr) => dispatch => {
    for (let i = 0; i < arr.length; i++) {
        switch (arr[i]) {
            case true :
                dispatch({
                    type: C.MODAL_CHECKED,
                    value: true
                })
                break
            case false :
                dispatch({
                    type: C.MODAL_CHECKED,
                    value: false
                })
                break
            default :
                // dispatch({
                //     type: C.MODAL_STATE,
                //     value: arr[i]
                // })
                return 0
        }
    }
}

export const _modalControlPanelState = (state) => dispatch => {
    orderFormElements.includes(state) ? dispatch({
        type: C.MODAL_STATE,
        value: state
    }) : console.log("state undefined")

}