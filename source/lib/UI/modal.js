import React from "react";
import {store} from "../store/index";
import {_modalState, _modalControlPanelState} from "../store/actions";

import ModalControlPanel from "./modal_components/index"
import {nextState, orderFormElements} from "../logic/factory";


// const nextState = () => {             //todo переписать
//     let indexLength = orderFormElements.length - 1,
//         state = store.getState().modalState.state || orderFormElements[0],
//         i = orderFormElements.indexOf(state) + 1 > indexLength ? 0 : orderFormElements.indexOf(state) + 1
//     return orderFormElements[i]
// }

// const helperComponent = (nextState, str, state, event) => { // функция помощник, которая предотвращает дублирование кода
//     if (str.length > 1 && state !== true) {                 // todo переписать nextState в глобалную функцию
//         store.dispatch(_modalState(true))
//     } else if (str.length < 2 && state !== false) {
//         store.dispatch(_modalState(false))
//     }
//     if (event.which === 13 || event.keyCode === 13) {
//         // event.preventDefault();
//         store.dispatch(_modalState(false))
//         store.dispatch(_modalControlPanelState(nextState()))
//     }
// }

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
            <div className={"wrapperForm"}>
                <ModalControlPanel data={data} nextState={nextState} key={'wrapperForm'}/>
                {state !== orderFormElements[0] ? <span className={"close"}
                                                        onClick={() => {
                                                            store.dispatch(_modalState(false))
                                                            store.dispatch(_modalControlPanelState(orderFormElements[0]))
                                                        }}></span> : null}
                {checkMark ? <span className={"checked"} onClick={() => {
                    store.dispatch(_modalState(false))
                    store.dispatch(_modalControlPanelState(nextState()))
                }}></span> : false}
            </div>

        </div>)
    }
}


// class ModalControlPanel extends React.Component {
//     constructor(props) {
//         super(props)
//     }
//
//     render() {
//         let {state} = store.getState().modalState
//         let {nextState, data} = this.props
//         return <TransitionGroup component={null}>
//             {
//                 (() => {
//                     switch (state) {
//                         case orderFormElements[1] :
//                             return <CSS key={"list2"}
//                                         classNames={"details"}            //CSS компонент позволяет добавить transition к последующим компонентам
//                                         timeout={500}>
//                                 <Name nextState={nextState} key={'name'}></Name>
//                             </CSS>
//                         case orderFormElements[2] :
//                             return <CSS key={"list3"} classNames={"details"}
//                                         timeout={500}>
//                                 <Description nextState={nextState} key={'details'}></Description>
//                             </CSS>
//
//                         case orderFormElements[3] :
//                             return <CSS key={"list4"} classNames={"colorSelection"}
//                                         timeout={500}>
//                                 <Color key={'colors'}></Color>
//                             </CSS>
//                         case orderFormElements[4] :
//                             return <CSS key={"list4"} classNames={"colorSelection"}
//                                         timeout={500}>
//                                 <Type nextState={nextState} key={'eventСlass'}></Type>
//                             </CSS>
//                         case orderFormElements[5] :
//                             return <CSS key={"list4"} classNames={"colorSelection"}
//                                         timeout={500}>
//                                 <Confirmation key={'eventСlass'}></Confirmation>
//                             </CSS>
//                         default :
//                             return <CSS key={"list1"} classNames={"button"}
//                                         timeout={1000}>
//                                 <Initial data={data} key={'button'}></Initial>
//                             </CSS>
//                     }
//                 })()
//
//             }
//         </TransitionGroup>
//     }
// }

// class Confirmation extends React.Component {
//
//     constructor(props) {
//         super(props)
//     }
//
//     componentDidMount() {
//         storeEvent.dispatch(_tasks(store.getState().tempTask))
//         store.dispatch(_modalControlPanelState(orderFormElements[0]))
//         console.log(storeEvent.getState())
//     }
//
//     render() {
//         return <div>
//             {JSON.stringify(store.getState().tempTask)}
//         </div>
//     }
// }

// const Initial = (props) =>
//     <button key={"button"} onClick={() => {
//         store.dispatch(_modalControlPanelState(nextState()))
//         store.dispatch(_tempTask({dataStart: props.data}, {dataEnd: props.data}))
//     }}
//             className={'createEvent'}>Создать событие</button>


// class Type extends React.Component {
//
//     constructor(props) {
//         super(props)
//         this.onTestChange = this.onTestChange.bind(this)
//     }
//
//     componentWillUnmount() {
//         let str = this.refs._title.value
//         let state = store.getState().modalState.state
//         state !== orderFormElements[0] ? store.dispatch(_tempTask({type: str})) : false
//     }
//
//     onTestChange = (event) => {
//         helperComponent(this.props.nextState, this.refs._title.value, store.getState().modalState.checkMark, event)
//     }
//
//
//     render() {
//         return <input onKeyDown={this.onTestChange} ref={"_title"}/>
//     }
// }


// class Name extends React.Component {
//
//     constructor(props) {
//         super(props)
//         this.onTestChange = this.onTestChange.bind(this)
//     }
//
//     componentWillUnmount() {
//         let str = this.refs._title.value
//         let {state} = store.getState().modalState
//         state !== orderFormElements[0] ? store.dispatch(_tempTask({name: str})) : false
//     }
//
//     onTestChange = (event) => {
//         helperComponent(this.props.nextState, this.refs._title.value, store.getState().modalState.checkMark, event)
//     }
//
//
//     render() {
//         return <input onKeyDown={this.onTestChange} ref={"_title"}/>
//     }
// }

// class Description extends React.Component {
//
//     constructor(props) {
//         super(props)
//         this.onTestChange = this.onTestChange.bind(this)
//     }
//
//     componentDidMount() {
//         // this.props.createEvent("hello", "friends")
//         // console.log(store.getState().modalState.state)
//     }
//
//     componentWillUnmount() {
//         let str = this.refs._title.value
//         let {state} = store.getState().modalState
//         state !== orderFormElements[0] ? store.dispatch(_tempTask({details: str})) : false
//     }
//
//
//     onTestChange = (event) => {
//         helperComponent(this.props.nextState, this.refs._title.value, store.getState().modalState.checkMark, event)
//     }
//
//     render() {
//         return (
//             <textarea key={"textarea"} ref="_title" onKeyDown={this.onTestChange} rows="3"
//                       autoComplete="off"
//                       id="exampleInputEvents"
//                       placeholder="Enter description" name="descriptionEvents"></textarea>
//         )
//     }
// }


// class Color extends React.Component {
//
//     constructor(props) {
//         super(props)
//         this.setSelectedInputRef = this.setSelectedInputRef.bind(this)
//         this.changeInput = null
//     }
//
//
//     setSelectedInputRef = element => {
//         this.changeInput ? false : store.dispatch(_modalState(true))
//         this.changeInput = element.target.value;
//     }
//
//     componentWillUnmount() {
//         let state = store.getState().modalState.state
//         state !== orderFormElements[0] ? store.dispatch(_tempTask({color: this.changeInput})) : false
//
//     }
//
//
//     render() {
//         return (
//             <div className={"colorSelection"}>
//                 <input onChange={this.setSelectedInputRef} id={"color-1"} name="color" type="radio"
//                        value="#0BE0D9"/>
//                 <label style={{backgroundColor: "#0BE0D9"}} htmlFor="color-1"></label>
//
//                 <input onChange={this.setSelectedInputRef} id={"color-2"} name="color" type="radio"
//                        value="#0BD696"/>
//                 <label style={{backgroundColor: "#0BD696"}} htmlFor="color-2"></label>
//
//                 <input onChange={this.setSelectedInputRef} id={"color-3"} name="color" type="radio"
//                        value="#0B76E0"/>
//                 <label style={{backgroundColor: "#0B76E0"}} htmlFor="color-3"></label>
//
//                 <input onChange={this.setSelectedInputRef} id={"color-4"} name="color" type="radio"
//                        value="#0B3BD6"/>
//                 <label style={{backgroundColor: "#0B3BD6"}} htmlFor="color-4"></label>
//             </div>)
//     }
// }

// export default Modal
