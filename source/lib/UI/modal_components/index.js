import {store} from "../../store";
import {orderFormElements} from "../constants"
import React from "react";
import {CSSTransition as CSS, TransitionGroup} from 'react-transition-group';
import Name from "./name";
import Initial from "./initial";
import Description from "./description";
import Color from "./color";
import Type from "./type";
import Confirmation from "./confirmation";
import EndEvent from "./end_event";


export default class ModalControlPanel extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let {state} = store.getState().panelState
        let {nextState, data} = this.props
        return <TransitionGroup component={null}>
            {
                (() => {
                    switch (state) {
                        case orderFormElements[1] :
                            return <CSS key={"list2"}
                                        classNames={"leftEmersion"}            //CSS компонент позволяет добавить transition к последующим компонентам
                                        timeout={500}>
                                <Name nextState={nextState} key={'name'}></Name>
                            </CSS>
                        case orderFormElements[2] :
                            return <CSS key={"list3"} classNames={"dissolution"}
                                        timeout={500}>
                                <Description nextState={nextState} key={'details'}></Description>
                            </CSS>

                        case orderFormElements[3] :
                            return <CSS key={"list4"} classNames={"rightEmersion"}
                                        timeout={500}>
                                <Color key={'colors'}></Color>
                            </CSS>
                        case orderFormElements[4] :
                            return <CSS key={"list5"} classNames={"leftEmersion"}
                                        timeout={500}>
                                <Type nextState={nextState} key={'type'}></Type>
                            </CSS>
                        case orderFormElements[5] :
                            return <CSS key={"list6"} classNames={"rightEmersion"}
                                        timeout={500}>
                                <EndEvent data={data} key={'endEventKey'}></EndEvent>
                            </CSS>
                        case orderFormElements[6] :
                            return <CSS key={"list7"} classNames={"rightEmersion"}
                                        timeout={500}>
                                <Confirmation key={'confirmation'}></Confirmation>
                            </CSS>
                        default :
                            return <CSS key={"list1"} classNames={"dissolution"}
                                        timeout={1000}>
                                <Initial data={data} key={'button'}></Initial>
                            </CSS>
                    }
                })()

            }
        </TransitionGroup>
    }
}