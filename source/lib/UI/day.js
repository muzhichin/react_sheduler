import {createLabelEvent, timeCalculation} from "../logic/factory";
import {store} from "../store";
import React from "react";
import {_modalHidden} from "../store/actions";


export default class Day extends React.Component {
    constructor(props) {
        super(props)
        const {monthCounter} = this.props
        this.activeDay = monthCounter === 0 ? timeCalculation().now : false
        this.openModal = this.openModal.bind(this)
    }

    shouldComponentUpdate(nextProps, nextState) {
        let {events, data} = this.props,
            excerpt = data === nextProps.data
        if (excerpt) {
            if (nextProps.events && events) {
                return events.length !== nextProps.events.length
            } else if (nextProps.events === null && events === null) {
                return false
            } else if (nextProps.events === null && events !== null) {
                return true
            } else if (events === null && nextProps.events !== null) {
                return true
            }

        } else {
            return true
        }

    }

    componentDidUpdate() {
        let {data} = this.props,
            dataOpenModal = store.getState().modalHidden.data
        dataOpenModal === data ? store.dispatch(_modalHidden(this.props)) : false //todo
    }


    openModal() {
        let {hidden} = store.getState().modalHidden
        hidden ? store.dispatch(_modalHidden(false)) : store.dispatch(_modalHidden(true, this.props))
    }

    render() {
        let {activeDay} = this,
            {dayNumber, events, data} = this.props,
            colors = events ? events.map((item) => item.color) : null,
            label = createLabelEvent(colors)
        return <div
            className={activeDay ? (activeDay === data ? 'day active' : 'day') : 'day'}
            onClick={this.openModal}>
            {label}
            <p>{dayNumber + 1}</p>
        </div>
    }
}