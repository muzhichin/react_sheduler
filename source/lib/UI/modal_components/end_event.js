import {store} from "../../store";
import React from "react";
import {limitEndingDate} from "../../logic/factory";
import {_modalState, _tempTask} from "../../store/actions";
import {orderFormElements} from "../constants"

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
        store.dispatch(_modalState(true))

    }

    componentDidUpdate() {
        let month = this.refs._month.value < 10 ? "0" + this.refs._month.value : this.refs._month.value
        let day = this.refs._day.value < 10 ? "0" + this.refs._day.value : this.refs._day.value
        let str = `${this.refs._year.value}-${month}-${day}`

        document.getElementById("controlElement").dataset.value = str
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
                break
            case "month" :
                this.setState(() => ({
                    selectedDate: {
                        year: year,
                        month: value,
                        day: day
                    }
                }))
                break
            case "day" :
                this.setState(() => ({
                    selectedDate: {
                        year: year,
                        month: month,
                        day: value
                    }
                }))
                break
            default :
                break
        }

    }


    render() {
        let beginningDate = this.props.data,
            {selectedDate} = this.state

        return <div id={"controlElement"} data-value={beginningDate} className={"endEvent elementAbsolute"}>
            <select ref="_year" name="year" onChange={this.handleChange}>
                {limitEndingDate(beginningDate, selectedDate, "year").map((i, key) => <option
                    key={`year${key}`}>{i}</option>)}
            </select>
            <select ref="_month" name="month" onChange={this.handleChange}>
                {limitEndingDate(beginningDate, selectedDate, "month").map((i, key) => <option
                    key={`month${key}`}>{i}</option>)}
            </select>
            <select ref="_day" name="day" onChange={this.handleChange}>
                {limitEndingDate(beginningDate, selectedDate, "day").map((i, key) => <option
                    key={`day${key}`}>{i}</option>)}
            </select>
        </div>
    }
}



