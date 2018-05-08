import {store} from "../../store";
import {helperComponent} from "../../logic/factory";
import {orderFormElements} from "../constants"
import React from "react";
import {_tempTask} from "../../store/actions";

export default class Type extends React.Component {

    constructor(props) {
        super(props)
        this.onTestChange = this.onTestChange.bind(this)
    }

    onTestChange = (event) => {
        let value = this.refs._title.value,
            state = store.getState().panelState.checkMark
        helperComponent(value, state, event)
    }


    render() {
        return <input id={"controlElement"} className={"elementAbsolute elementForm"} onKeyDown={this.onTestChange} ref={"_title"}/>
    }
}