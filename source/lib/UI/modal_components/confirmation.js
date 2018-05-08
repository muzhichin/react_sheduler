import {_panelState, _tasks} from "../../store/actions";
import {store, storeEvent} from "../../store";
import {orderFormElements} from "../constants"
import React from "react";

export default class Confirmation extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        storeEvent.dispatch(_tasks(store.getState().tempTask))
        store.dispatch(_panelState(orderFormElements[0]))
        console.log(storeEvent.getState())
    }

    render() {
        return <div className={"elementAbsolute"}>
            {/*{JSON.stringify(store.getState().tempTask)}*/}
            {/*Done!*/}
        </div>
    }
}