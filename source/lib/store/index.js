import {createStore, combineReducers, applyMiddleware} from 'redux'
import {modalHidden, panelState, tasks, tempTask, googleAuth} from './reducers'
import stateData from '../../data/initial_state'
import baseEvents from '../../data/base_events'
import baseGoogle from '../../data/base_google'
import thunk from 'redux-thunk'

const logger = store => next => action => {
    let result
    console.groupCollapsed("dispatching", action.type)
    console.log('prev state', store.getState())
    console.log('action', action)
    result = next(action)
    console.log('next state', store.getState())
    console.groupEnd()
    return result
}

const saver = store => next => action => {
    let result = next(action)
    let {storagName} = store.getState()
    localStorage[storagName] = JSON.stringify(store.getState())
    return result
}

const storeFactory = (initialState = stateData, name = 'redux-store') =>
    // applyMiddleware(thunk, logger, saver)(createStore)(
    applyMiddleware(thunk, saver)(createStore)(
        combineReducers({
            tasks,
            modalHidden,
            googleAuth,
            storagName: (state = {}) => state,
            panelState,
            tempTask
        }),
        (localStorage[name]) ?
            JSON.parse(localStorage[name]) :
            initialState
    )


export const store = storeFactory()
export const storeEvent = storeFactory(baseEvents, baseEvents.storagName)
export const storeGoogle = storeFactory(baseGoogle, baseGoogle.storagName)
