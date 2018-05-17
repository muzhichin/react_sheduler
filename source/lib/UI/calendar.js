import React from "react";
import PropTypes from 'prop-types'
import Modal from './modal'
import ChartTasks from './chart_tasks'
import Week from "./week";
import EmptyDay from "./empty_day";
import Month from "./month";
import {timeCalculation} from "../logic/factory";

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
                <ChartTasks monthCounter={isToggleOn}/>
            </div>
        )
    }
}

export default Calendar