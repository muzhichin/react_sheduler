import React from "react"
import {store} from "../store/index"
import {_panelButton, _panelState} from "../store/actions"
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
        let {data, name, hidden, id} = store.getState().modalHidden,
            {checkMark} = store.getState().panelState,
            state = store.getState().panelState.state || orderFormElements[0]
        return (<div id={"modal"} className={hidden ? "open" : ""}>
            <div className={"wrapperEvent"}>
                <p>{data}</p>
                {name === null ?
                    <div id={id} className="event"><p>Нет событий</p></div> : name.map((item, num) => <div id={id[num]}
                        key={`event${num}`} className="event"><p>{item}</p>
                    </div>)}
                    {/*<EventList></EventList>*/}
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