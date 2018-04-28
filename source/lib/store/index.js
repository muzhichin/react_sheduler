import {createStore, combineReducers, applyMiddleware} from 'redux'
import {modalHidden, modalState, tasks, tempTask, nameStore} from './reducers'
import stateData from '../../data/initialState'
import stateDataEvent from '../../data/initialStateEvent'
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
    let {nameStore} = store.getState()
    localStorage[nameStore] = JSON.stringify(store.getState())
    return result
}

const storeFactory = (initialState = stateData, name = 'redux-store') =>
    applyMiddleware(thunk, logger, saver)(createStore)(
        combineReducers({tasks, nameStore, modalHidden, modalState, tempTask}),
        (localStorage[name]) ?
            JSON.parse(localStorage[name]) :
            initialState
    )


export const store = storeFactory()
export const storeEvent = storeFactory(stateDataEvent, 'redux-event-store')
