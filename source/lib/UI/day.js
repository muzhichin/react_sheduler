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

    componentDidUpdate() {
        let {event, data} = this.props
        let dataOpenModal = store.getState().modalHidden.data
        dataOpenModal === data ? store.dispatch(_modalHidden(event)) : false //todo
    }

    componentWillReceiveProps(nextProps) {

    }


    openModal() {
        let {event, data, idEvent} = this.props
        let {hidden} = store.getState().modalHidden
        hidden ? store.dispatch(_modalHidden(false)) : store.dispatch(_modalHidden(true, event, data, {id: idEvent}))
    }

    render() {
        let {activeDay} = this
        let {color, data, day_number} = this.props
        let label = createLabelEvent(color)
        return <div
            className={activeDay ? (activeDay === data ? 'day active' : 'day') : 'day'}
            onClick={this.openModal}>
            {label}
            <p>{day_number + 1}</p>
        </div>
    }
}