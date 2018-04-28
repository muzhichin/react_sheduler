import {store} from "../../store";
import {orderFormElements,helperComponent} from "../../logic/factory";
import React from "react";
import {_tempTask} from "../../store/actions";

export default class Description extends React.Component {

    constructor(props) {
        super(props)
        this.onTestChange = this.onTestChange.bind(this)
    }

    componentDidMount() {
        // this.props.createEvent("hello", "friends")
        // console.log(store.getState().modalState.state)
    }

    componentWillUnmount() {
        let str = this.refs._title.value
        let {state} = store.getState().modalState
        state !== orderFormElements[0] ? store.dispatch(_tempTask({details: str})) : false
    }


    onTestChange = (event) => {
        helperComponent(this.props.nextState, this.refs._title.value, store.getState().modalState.checkMark, event)
    }

    render() {
        return (
            <textarea key={"textarea"} ref="_title" onKeyDown={this.onTestChange} rows="3"
                      autoComplete="off"
                      id="exampleInputEvents"
                      placeholder="Enter description" name="descriptionEvents"></textarea>
        )
    }
}
