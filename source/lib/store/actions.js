import C from './constants'
import {v4} from 'uuid'

export const _tasks = (obj) => {
    let {color, name, type, details, dataStart, dataEnd} = obj
    return ({
        type: C.SET_TASK,
        value: {
            data: {
                start: dataStart,
                end: dataEnd
            },
            type: type,
            details: details,
            name: name,
            id: v4(),
            color: color
        }
    })
}


export const _modalHidden = (...arr) => dispatch => {
    for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i] === "object") {
            dispatch({
                type: C.MODAL_DISPLAY_ID,
                value: arr[i].id[0]
            })
        } else if (typeof arr[i] === "boolean" && (arr[i] === true || arr[i] === false)) {
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
        arrState.includes(str) ? dispatch({
            type: C.TEMP_TASK,
            value: i
        }) : console.log("no str")
    })
}


export const _modalState = (...arr) => dispatch => {
    for (let i = 0; i < arr.length; i++) {
        switch (arr[i]) {
            case "checkMark_true" :
                dispatch({
                    type: C.MODAL_CHECKED,
                    value: true
                })
                break
            case "checkMark_false" :
                dispatch({
                    type: C.MODAL_CHECKED,
                    value: false
                })
                break
            default :
                dispatch({
                    type: C.MODAL_STATE,
                    value: arr[i]
                })
        }
    }
}