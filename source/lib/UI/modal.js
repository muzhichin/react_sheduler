import React from "react"
import {store} from "../store/index"
import {_panelButton, _panelState, _modalHidden} from "../store/actions"
import ModalControlPanel from "./modal_components/index"
import EventItem from "./modal_components/event_item"
import {nextState} from "../logic/factory"
import {orderFormElements} from "./constants"
import {dataControl} from "../logic/factory"

export default class Modal extends React.Component {
    constructor(props) {
        super(props)
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }


    componentWillMount() {
        this.unsubscribe = store.subscribe(
            () => this.forceUpdate()
        )
    }

    componentWillUnmount() {
        this.unsubscribe()
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(event) {
        if (event.target.parentNode.className === "day") {
            return
        } else if (event.target.getAttribute("data-name") === "rect-chart-event") {
            return
        }
        if (this.wrapperRef && !this.wrapperRef.contains(event.target) && store.getState().modalHidden.hidden) {
            store.dispatch(_modalHidden(false))
        }
    }

    render() {
        let {events, hidden, data} = store.getState().modalHidden || null,
            {checkMark} = store.getState().panelState,
            state = store.getState().panelState.state || orderFormElements[0]  //todo nextState={nextState} передача в ModalControlPanel
        return (<div id={"modal"} ref={this.setWrapperRef} className={hidden ? "open" : ""}>
            <div className={"wrapperEvent"}>
                <p className={"wrapperEventData"}>{data}</p>
                {Array.isArray(events) ? events.map((cur, i) =>
                        <EventItem {...cur} key={`event-${i}`}></EventItem>) :
                    <div className="event no-event"><p>Нет событий</p></div>}
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