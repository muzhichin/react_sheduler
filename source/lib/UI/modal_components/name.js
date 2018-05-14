import {store} from "../../store";
import {helperComponent} from "../../logic/factory";
import React from "react";

export default class Name extends React.Component {

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
        return <input placeholder="Name event" id={"controlElement"} className={"elementAbsolute elementForm"} onKeyDown={this.onTestChange}
                      ref={"_title"}/>
    }
}