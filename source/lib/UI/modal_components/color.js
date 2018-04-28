import {store} from "../../store";
import {_modalState, _tempTask} from "../../store/actions";
import {orderFormElements} from "../../logic/factory";
import React from "react";

export default class Color extends React.Component {

    constructor(props) {
        super(props)
        this.setSelectedInputRef = this.setSelectedInputRef.bind(this)
        this.changeInput = null
    }


    setSelectedInputRef = element => {
        this.changeInput ? false : store.dispatch(_modalState(true))
        this.changeInput = element.target.value;
    }

    componentWillUnmount() {
        let state = store.getState().modalState.state
        state !== orderFormElements[0] ? store.dispatch(_tempTask({color: this.changeInput})) : false

    }


    render() {
        return (
            <div className={"colorSelection"}>
                <input onChange={this.setSelectedInputRef} id={"color-1"} name="color" type="radio"
                       value="#0BE0D9"/>
                <label style={{backgroundColor: "#0BE0D9"}} htmlFor="color-1"></label>

                <input onChange={this.setSelectedInputRef} id={"color-2"} name="color" type="radio"
                       value="#0BD696"/>
                <label style={{backgroundColor: "#0BD696"}} htmlFor="color-2"></label>

                <input onChange={this.setSelectedInputRef} id={"color-3"} name="color" type="radio"
                       value="#0B76E0"/>
                <label style={{backgroundColor: "#0B76E0"}} htmlFor="color-3"></label>

                <input onChange={this.setSelectedInputRef} id={"color-4"} name="color" type="radio"
                       value="#0B3BD6"/>
                <label style={{backgroundColor: "#0B3BD6"}} htmlFor="color-4"></label>
            </div>)
    }
}
