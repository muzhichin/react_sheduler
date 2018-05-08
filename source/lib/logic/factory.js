import React from 'react';
import moment from "moment/moment";
import {store, storeEvent} from "../store/index";
import {_panelState, _panelButton, _tempTask} from "../store/actions";
import {orderFormElements} from "../UI/constants"


export const dataControl = () => {
    let controlElement = document.getElementById("controlElement"),
        state = store.getState().panelState.state

    if (controlElement) {
        controlElement.tagName === "INPUT" || controlElement.tagName === "TEXTAREA" ? store.dispatch(_tempTask(
            JSON.parse(`{"${state}" : "${controlElement.value}"}`)
        )) : false

        controlElement.tagName === "DIV" ? store.dispatch(_tempTask(
            JSON.parse(`{"${state}" : "${controlElement.dataset.value}"}`)
        )) : false
    }
    store.dispatch(_panelButton(false))
    store.dispatch(_panelState(nextState()))
}

export const validationEndingDate = (beginningDate, selectedDate, type) => {
    let year = +beginningDate.split("-")[0],
        arrYear = [],
        arrMonth = [],
        arrDay = []

    for (let i = 0; i < 5; i++) {
        arrYear[i] = year + i
    }

    year = +selectedDate.year || +beginningDate.split("-")[0]
    let month = +selectedDate.month || +beginningDate.split("-")[1]

    if (year === +beginningDate.split("-")[0]) {
        for (let i = 0; i <= 12 - +beginningDate.split("-")[1]; i++) {
            arrMonth.push(+beginningDate.split("-")[1] + i)
        }

    } else {
        for (let i = 1; i <= 12; i++) {
            arrMonth.push(i)
        }
    }


    let lastDay = +moment().set('year', year).set('month', month - 1).endOf('month').format('DD'),
        day = +beginningDate.split("-")[2]


    if (year === +beginningDate.split("-")[0] && month <= +beginningDate.split("-")[1]) {
        for (let i = 0; i <= lastDay - day; i++) {
            arrDay.push(day + i)
        }
    } else {
        for (let i = 1; i <= lastDay; i++) {
            arrDay.push(i)
        }
    }

    switch (type) {
        case "year" :
            return arrYear
        case "month" :
            return arrMonth
        case "day" :
            return arrDay
        default :
            return [null, null, null]
    }
}

export const helperComponent = (str, state, event) => { // функция помощник, которая предотвращает дублирование кода
    if (str.length > 1 && state !== true) {
        store.dispatch(_panelButton(true))
    } else if (str.length < 2 && state !== false) {
        store.dispatch(_panelButton(false))
    }
    if (event.which === 13 || event.keyCode === 13) {
        // event.preventDefault();
        dataControl()
    }
}


export const nextState = () => {             //todo переписать
    let indexLength = orderFormElements.length - 1,
        state = store.getState().panelState.state || orderFormElements[0],
        i = orderFormElements.indexOf(state) + 1 > indexLength ? 0 : orderFormElements.indexOf(state) + 1
    return orderFormElements[i]
}


export function timeCalculation(monthCounter = 0) {

    let data = moment().add(monthCounter, 'month'),
        set = (id) => data.set('date', id).format('YYYY-MM-DD'),
        now = data.format('YYYY-MM-DD'),
        lastDay = data.endOf('month').format('DD'),
        firstWeek = data.date(1).isoWeekday() - 1, //1 - 7
        dayWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    return {data, dayWeek, now, firstWeek, lastDay, set}

}

export function substrateData(monthCounter = 0) {
    let dataEndOf = moment().add(monthCounter, 'month').endOf('month').format('YYYY-MM-DD')
    let dataStartOf = moment().add(monthCounter, 'month').startOf('month').format('YYYY-MM-DD')
    return {dataEndOf, dataStartOf}
}

export function oneDayMore(data) {
    return moment(data).add(1, 'days').format('YYYY-MM-DD')
}

export const dayTaskmanSort = (monthCounter) => {
    let listDay = recursion(timeCalculation(monthCounter).lastDay, [], (_id) => timeCalculation(monthCounter).set(_id)),
        idEvent = storeEvent.getState().tasks.map((arr) => {
            let result = listDay.filter(e =>
                moment(e).isBetween(arr.data.start, arr.data.end, null, '[]')
            )
            let [first] = result
            let [last] = result.reverse()
            let obj = {
                data: {start: first, end: last}
            }

            return (first !== undefined) ? {...arr, ...obj} : false
        })
    return idEvent.filter(e => e !== false)
}

export const dayComponentSort = (monthCounter) => {
    let listDay = recursion(timeCalculation(monthCounter).lastDay, [], (_id) => timeCalculation(monthCounter).set(_id))

    return listDay.map(item => {
        let temp = storeEvent.getState().tasks.filter(obj => moment(item).isBetween(obj.data.start, obj.data.end, null, '[]'))
        if (temp.length > 0) {
            let obj = temp.reduce((acc, cur, i) => {
                acc.name[i] = [cur.name]
                acc.id[i] = [cur.id]
                acc.color[i] = [cur.color]
                return acc
            }, {name: [], color: [], id: []})
            return {data: item, ...obj}
        } else {
            return {data: item, name: null, color: null}
        }
    })
}

export const createEmptyDay = (monthCounter) => {
    let n = timeCalculation(monthCounter).firstWeek
    if (n !== 7) {
        let elem = (_key) => <div key={`empty-${_key}`} className={'emptyDay'}></div>,
            arr = recursion(n, [], elem) || false
        return arr
    } else {
        return
    }
}

export const recursion = (n, arr, e) => {
    if (n < 0) {
        return 0
    }
    else if (n === 0) {
        return arr.reverse()
    }
    else {
        arr.push(e(n))
        return recursion(n - 1, arr, e)
    }
}

export function createLabelEvent(colorPack) {
    if (colorPack && colorPack.length < 5 && colorPack.length > 0) {
        return colorPack.map((color, num) => <div key={num} className="label" style={{
            background: color,
            width: 40 - (10 * num) + 'px',
            height: 40 - (10 * num) + 'px'
        }}></div>)
    } else if (colorPack && colorPack.length > 4) {
        return colorPack.map((color, num) => <div key={num} className="label" style={{
            background: color,
            width: '4px',
            height: '4px',
            top: 0,
            bottom: 'initial',
            left: 4 * num + 'px',
            right: 'initial'
        }}></div>)
    } else {
        return false
    }
}

