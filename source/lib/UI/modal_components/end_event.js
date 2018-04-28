import {store} from "../../store";
import React from "react";
import {orderFormElements, limitEndingDate} from "../../logic/factory";
import {_modalState, _tempTask} from "../../store/actions";

export default class EndEvent extends React.Component {

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            selectedDate: {
                year: null,
                month: null,
                day: null
            }
        }
    }

    componentDidMount() {
        // let data = this.props.data.split("-")
        store.dispatch(_modalState(true))

    }

    componentWillUnmount() {
        let str = `${this.refs._year.value}-${this.refs._month.value}-${this.refs._day.value}`
        console.log(str)
        store.dispatch(_tempTask({dataEnd: str}))
    }

    handleChange = (event) => {

        let value = event.target.value
        let {year, month, day} = this.state.selectedDate

        switch (event.target.name) {
            case "year" :
                this.setState(() => ({
                    selectedDate: {
                        year: value,
                        month: month,
                        day: day
                    }
                }))
                return
            case "month" :
                this.setState(() => ({
                    selectedDate: {
                        year: year,
                        month: value,
                        day: day
                    }
                }))
                return
            case "day" :
                this.setState(() => ({
                    selectedDate: {
                        year: year,
                        month: month,
                        day: value
                    }
                }))
                return
            default :
                return console.log("default")
        }
    }


    render() {
        let beginningDate = this.props.data,
            {selectedDate} = this.state

        return <div>
            <select ref="_year" name="year" onChange={this.handleChange}>
                {limitEndingDate(beginningDate, selectedDate, "year").map(i => <option>{i}</option>)}
            </select>
            <select ref="_month" name="month" onChange={this.handleChange}>
                {limitEndingDate(beginningDate, selectedDate, "month").map(i => <option>{i}</option>)}
            </select>
            <select ref="_day" name="day" onChange={this.handleChange}>
                {limitEndingDate(beginningDate, selectedDate, "day").map(i => <option>{i}</option>)}
            </select>
        </div>
    }
}