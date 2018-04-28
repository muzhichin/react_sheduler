import React from 'react';
import moment from "moment/moment";
import {store, storeEvent} from "../store/index";

export function timeCalculation(monthCounter = 0) {

    let data = moment().add(monthCounter, 'month'),
        set = (id) => data.set('date', id).format('YYYY-MM-DD'),
        now = data.format('YYYY-MM-DD'),
        lastDay = data.endOf('month').format('DD'),
        firstWeek = moment().add(monthCounter, 'month').weekday() + 1, //1 - 7
        dayWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    return {data, dayWeek, now, firstWeek, lastDay, set}

}

export function substrateData(monthCounter = 0) {
    let dataEndOf = moment().add(monthCounter, 'month').endOf('month').format('YYYY-MM-DD')
    let dataStartOf = moment().add(monthCounter, 'month').startOf('month').format('YYYY-MM-DD')
    return {dataEndOf, dataStartOf}
}

export function oneDayMore(data) {
    let nextDay = moment(data).add(1, 'days').format('YYYY-MM-DD')
    return nextDay
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
    let listDay = recursion(timeCalculation(monthCounter).lastDay, [], (_id) => timeCalculation(monthCounter).set(_id)),
        sort = listDay.map(item => {
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
        });
    return sort
}

export const createEmptyDay = (monthCounter) => {
    if (timeCalculation(monthCounter).firstWeek !== 7) {
        let elem = (_key) => <div key={`empty-${_key}`} className={'emptyDay'}></div>,
            arr = recursion(timeCalculation(monthCounter).firstWeek, [], elem) || false
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
        let label = colorPack.map((color, num) => <div key={num} className="label" style={{
            background: color,
            width: 40 - (10 * num) + 'px',
            height: 40 - (10 * num) + 'px'
        }}></div>)
        return label
    } else if (colorPack && colorPack.length > 4) {
        let label = colorPack.map((color, num) => <div key={num} className="label" style={{
            background: color,
            width: '4px',
            height: '4px',
            top: 0,
            bottom: 'initial',
            left: 4 * num + 'px',
            right: 'initial'
        }}></div>)
        return label
    } else {
        return false
    }
}
