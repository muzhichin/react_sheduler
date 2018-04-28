import React from "react";
import {store} from "../store/index";
import {createEmptyDay, createLabelEvent, timeCalculation} from "../logic/factory";
import {_modalHidden} from "../store/actions";

// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


class Day extends React.Component {
    constructor(props) {
        super(props)
        const {monthCounter} = this.props
        this.activeDay = monthCounter === 0 ? timeCalculation().now : false
        this.openModal = this.openModal.bind(this)
    }

    componentDidUpdate() {
        let {event, data} = this.props
        let dataOpenModal = store.getState().modalHidden.data
        dataOpenModal === data ? store.dispatch(_modalHidden(event)) : false
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


const EmptyDay = (props) => {
    let {monthCounter} = props
    let arr = createEmptyDay(monthCounter)
    return arr ? arr.map(item => item) : false
}


const Week = () => timeCalculation().dayWeek.map(item => <div key={item}><p>{item}</p></div>)

export {EmptyDay, Week, Day}