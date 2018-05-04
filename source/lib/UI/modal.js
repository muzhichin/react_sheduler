import React from "react"
import {store} from "../store/index"
import {_modalState, _modalControlPanelState, _tempTask} from "../store/actions"
import ModalControlPanel from "./modal_components/index"
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
        let {data, event, hidden, idEvent} = store.getState().modalHidden,
            {checkMark} = store.getState().modalState,
            state = store.getState().modalState.state || orderFormElements[0]
        return (<div id={"modal"} className={hidden ? "open" : ""}>
            <div className={"wrapperEvent"}>
                <p>{data}</p>
                {event === null ?
                    <div id={idEvent} className="event"><p>Нет событий</p></div> : event.map((item, num) => <div
                        key={`event${num}`} className="event"><p>{item}</p>
                    </div>)}
            </div>
            <div className={"modalControlPanel"}>
                <ModalControlPanel id={"idControl"} data={data} nextState={nextState} key={'modalControlPanel'}/>
                {state !== orderFormElements[0] ? <span className={"close"}
                                                        onClick={() => {
                                                            store.dispatch(_modalState(false))
                                                            store.dispatch(_modalControlPanelState(orderFormElements[0]))
                                                        }}></span> : null}
                {checkMark ? <span className={"checked"} onClick={dataControl}></span> : false}
            </div>

        </div>)
    }
}