import React from "react";
import PropTypes from 'prop-types'
import Modal from './modal'
import Taskman from './schedule_tasks'
import {Day, EmptyDay, Week} from "./calendar_cell";
import {dayComponentSort, timeCalculation} from "../logic/factory";
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {store, storeEvent} from "../store/index";


// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Calendar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isToggleOn: 0,
            classAnimations: false
        }

        this.handleClick = this.handleClick.bind(this)
        this.handleClickBack = this.handleClickBack.bind(this)
    }

    static defaultProps = {
        ingredients: 0,
        steps: 0,
        title: "[recipe]"
    }

    static contextTypes = {
        store: PropTypes.object
    }


    // getChildContext() {
    //     return {
    //         store: this.props.store
    //     }
    // }

    handleClick() {
        this.setState(prevState => ({
            isToggleOn: this.state.isToggleOn + 1,
            classAnimations: true
        }))
        setTimeout(() => this.setState(prevState => ({
            classAnimations: false
        })), 300)
    }

    handleClickBack() {
        this.setState(prevState => ({
            isToggleOn: this.state.isToggleOn - 1,
            classAnimations: true
        }))
        setTimeout(() => this.setState(prevState => ({
            classAnimations: false
        })), 300)
    }

    render() {
        let {isToggleOn, classAnimations} = this.state

        return (
            <div id={"app"}>
                <div id={'calendar'}>
                    < Modal/>
                    <div className={'caledarHeader'}>
                        <span className={'button-previos'} onClick={this.handleClickBack}></span>
                        <p className={classAnimations ? "animation" : null}>{timeCalculation(isToggleOn).data.format('YYYY MMMM')}</p>
                        <span className={'button-next'} onClick={this.handleClick}></span>
                    </div>
                    <div className={'calendarWrapper'}>
                        < Week/>
                        < EmptyDay monthCounter={isToggleOn}/>
                        < Month monthCounter={isToggleOn}/>
                    </div>
                </div>
                <Taskman monthCounter={isToggleOn}/>
            </div>
        )
    }
}

class Month extends React.Component {
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
        let {monthCounter} = this.props
        let sortDayEvents = dayComponentSort(monthCounter)
        return sortDayEvents.map((item, k) => {
            console.log(item)
            return <Day
            // idEvent={item.}
            monthCounter={monthCounter}
            idEvent={item.id}
            event={item.name} color={item.color} key={`day-${k}`}
            data={item.data} keyDay={`day-${k}`} day_number={k}/>})
    }
}

export default Calendar