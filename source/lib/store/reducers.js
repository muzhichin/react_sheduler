import C from './constants'

export const tasks = (state = {}, action) => {
    switch (action.type) {
        case C.SET_TASK :
            let {value} = action
            return [...state, value]
        case C.REMOVE_TASK :
            return action.value ? state.filter(arr => arr.id !== action.value) : false
        default:
            return state
    }
}

export const googleAuth = (state = {}, action) => {
    switch (action.type) {
        case C.GOOGLE_AUTH :
            return action.value
        default:
            return state
    }
}


export const modalHidden = (state = {}, action) => {
    switch (action.type) {
        case C.MODAL_HIDDEN :
            return {...state, hidden: action.value}
        case C.MODAL_LIST :
            return {...state, ...action.value}
        default:
            return state
    }
}

export const panelState = (state = {}, action) => {
    switch (action.type) {
        case C.PANEL_STATE :
            return {...state, state: action.value}
        case C.PANEL_BUTTON :
            return {...state, checkMark: action.value}
        default:
            return state
    }
}


export const tempTask = (state = {}, action) => {
    switch (action.type) {
        case C.TEMP_TASK :
            let {value} = action
            // console.log(value)
            return {...state, ...value}
        default:
            return state
    }
}