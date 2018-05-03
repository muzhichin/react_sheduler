import C from './constants'

export const tasks = (state = {}, action) => {
    switch (action.type) {
        case C.SET_TASK :
            let {value} = action
            return [...state, value]
        default:
            return state
    }
}

export const nameStore = (state = {}, action) => {
    switch (action.type) {
        default:
            return state
    }
}


export const modalHidden = (state = {}, action) => {
    switch (action.type) {
        case C.MODAL_OPEN :
            return {...state, hidden: action.value}
        case C.MODAL_DISPLAY_ID :
            return {...state, idEvent: action.value}
        case C.EVENT_DISPLAY :
            return {...state, event: action.value}
        case C.MODAL_SET_DATA :
            return {...state, data: action.value}
        default:
            return state
    }
}

export const modalState = (state = {}, action) => {
    switch (action.type) {
        case C.MODAL_STATE :
            return {...state, state: action.value}
        case C.MODAL_CHECKED :
            return {...state, checkMark: action.value}
        default:
            return state
    }
}


export const tempTask = (state = {}, action) => {
    switch (action.type) {
        case C.TEMP_TASK :
            let {value} = action
            console.log(value)
            return {...state, ...value}
        default:
            return state
    }
}