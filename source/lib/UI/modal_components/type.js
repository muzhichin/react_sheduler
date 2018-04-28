import {store} from "../../store";
import {orderFormElements,helperComponent} from "../../logic/factory";
import React from "react";
import {_tempTask} from "../../store/actions";

export default class Type extends React.Component {

    constructor(props) {
        super(props)
        this.onTestChange = this.onTestChange.bind(this)
    }

    componentWillUnmount() {
        let str = this.refs._title.value
        let state = store.getState().modalState.state
        state !== orderFormElements[0] ? store.dispatch(_tempTask({type: str})) : false
    }

    onTestChange = (event) => {
        helperComponent(this.props.nextState, this.refs._title.value, store.getState().modalState.checkMark, event)
    }


    render() {
        return <input onKeyDown={this.onTestChange} ref={"_title"}/>
    }
}