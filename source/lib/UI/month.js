import {storeEvent} from "../store";
import React from "react";
import {dayComponentSort} from "../logic/factory";
import Day from "./day";

export default class Month extends React.Component {
    constructor(props) {
        super(props)
        // const {monthCounter} = this.props
    }

    componentWillMount() {
        this.unsubscribe = storeEvent.subscribe(
            () => this.forceUpdate()
        )
    }

    componentWillUnmount() {
        this.unsubscribe()
    }


    render() {
        let {monthCounter} = this.props,
            sortDayEvents = dayComponentSort(monthCounter)
        return sortDayEvents.map((item, k) => {
            // console.log(item)
            return <Day
                // idEvent={item.}
                monthCounter={monthCounter}
                idEvent={item.id}
                event={item.name} color={item.color} key={`day-${k}`}
                data={item.data} keyDay={`day-${k}`} day_number={k}/>
        })
    }
}