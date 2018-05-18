import {storeEvent, storeGoogle} from "../store/index";
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

        this.unsubscribeGoogle = storeGoogle.subscribe(
            () => this.forceUpdate()
        )
    }

    componentWillUnmount() {
        this.unsubscribe()
        this.unsubscribeGoogle()
    }


    render() {
        let {monthCounter} = this.props,
            sortDayEvents = dayComponentSort(monthCounter)
        return sortDayEvents.map((item, k) => {
            return <Day
                monthCounter={monthCounter}
                key={`day-${k}`}
                {...item} dayNumber={k}/>}
            //
            // monthCounter={monthCounter}
            // idEvent={item.id}
            // event={item.name} color={item.color} key={`day-${k}`}
            // data={item.data} keyDay={`day-${k}`} day_number={k}/>
        )
    }
}