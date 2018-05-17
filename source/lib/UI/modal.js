import React from "react"
import {store} from "../store/index"
import {_panelButton, _panelState} from "../store/actions"
import ModalControlPanel from "./modal_components/index"
import EventItem from "./modal_components/event_item"
import {nextState} from "../logic/factory"
import {orderFormElements} from "./constants"
import {dataControl} from "../logic/factory"

export default class Modal extends React.Component {
    constructor(props) {
        super(props)

    }

    componentWillMount() {
        this.unsubscribe = store.subscribe(
            () => this.forceUpdate()
        )
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    render() {
        let {events, hidden, data} = store.getState().modalHidden,
            {checkMark} = store.getState().panelState,
            state = store.getState().panelState.state || orderFormElements[0]  //todo nextState={nextState} передача в ModalControlPanel
        return (<div id={"modal"} className={hidden ? "open" : ""}>
            <div className={"wrapperEvent"}>
                <p>{data}</p>
                {events === null ?
                    <div id={'no-events'} className="event"><p>Нет событий</p></div> : events.map((cur, i) =>
                        <EventItem {...cur} key={`event-${i}`}></EventItem>)}
            </div>
            <div className={"modalControlPanel"}>
                <ModalControlPanel id={"idControl"} data={data} nextState={nextState} key={'modalControlPanel'}/>
                {state !== orderFormElements[0] ? <span className={"close"}
                                                        onClick={() => {
                                                            store.dispatch(_panelButton(false))
                                                            store.dispatch(_panelState(orderFormElements[0]))
                                                        }}></span> : null}
                {checkMark ? <span className={"checked"} onClick={dataControl}></span> : false}
            </div>

        </div>)
    }
}