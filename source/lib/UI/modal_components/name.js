import {store} from "../../store";
import {helperComponent} from "../../logic/factory";
import React from "react";
import {_tempTask} from "../../store/actions";
import {orderFormElements} from "../constants"

export default class Name extends React.Component {

    constructor(props) {
        super(props)
        this.onTestChange = this.onTestChange.bind(this)
    }

    componentWillUnmount() {
        // let str = this.refs._title.value
        // let {state} = store.getState().modalState
        // state !== orderFormElements[0] ? store.dispatch(_tempTask({name: str})) : false
    }

    onTestChange = (event) => {
        helperComponent(this.props.nextState, this.refs._title.value, store.getState().modalState.checkMark, event)
    }


    render() {
        return <input id={"controlElement"} className={"elementAbsolute elementForm"} onKeyDown={this.onTestChange} ref={"_title"}/>
    }
}