import {store} from "../../store";
import {helperComponent} from "../../logic/factory";
import React from "react";
import {orderFormElements} from "../constants"
import {_tempTask} from "../../store/actions";

export default class Description extends React.Component {

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
        return (
            <textarea id={"controlElement"} key={"textarea"} ref="_title" onKeyDown={this.onTestChange} rows="3"
                      autoComplete="off"
                      placeholder="Enter description" className={"elementAbsolute elementForm"} name="descriptionEvents"></textarea>
        )
    }
}
