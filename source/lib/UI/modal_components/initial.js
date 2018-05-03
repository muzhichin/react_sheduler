import {_modalControlPanelState, _tempTask} from "../../store/actions";
import {store} from "../../store";
import React from "react";
import {nextState} from "../../logic/factory";

const Initial = (props) =>
    <button key={"button"} onClick={() => {
        store.dispatch(_modalControlPanelState(nextState()))
        store.dispatch(_tempTask({EVENT_START: props.data}))
    }}
            className={'createEvent'}>Создать событие</button>

export default Initial