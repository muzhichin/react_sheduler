import {store} from "../../store";
import {_panelButton, _tempTask} from "../../store/actions";
import React from "react";
import {orderFormElements} from "../constants"

export default class Color extends React.Component {

    constructor(props) {
        super(props)
        this.setSelectedInputRef = this.setSelectedInputRef.bind(this)
        this.state = {
            firstChecked : true
        }
    }


    setSelectedInputRef = element => {
        element.target.id !== "color-1" ? this.setState(()=> ({firstChecked : false})) : this.setState(()=> ({firstChecked : true}))
        element.target.parentNode.dataset.value = element.target.value
    }

    componentDidMount() {
       this.props.excerpt ? 0 : store.dispatch(_panelButton(true))
    }


    render() {
        let checked =  this.state.firstChecked
        return (
            <div id={"controlElement"} data-value="#0BE0D9" className={"colorSelection elementAbsolute"}>
                <input checked={checked} onChange={this.setSelectedInputRef} id={"color-1"} name="color" type="radio"
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
