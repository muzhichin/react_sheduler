import React from "react";
import Name from "./name"
import Color from "./color"
import Description from "./description"
import {tasks} from "../../store/reducers"
import {storeEvent} from "../../store/index"

export default class EventItem extends React.Component {
    constructor(props) {
        super(props)
        this.onChangeEvent = this.onChangeEvent.bind(this)
        this.state = {
            info: false,
            changeMenu: false
        }
    }

    onChangeEvent(e) {
        if (e === "info") {
            this.setState(() => ({
                info: !this.state.info,
                changeMenu: false
            }))
        } else if (e === "edit") {
            this.setState(() => ({
                changeMenu: !this.state.changeMenu
            }))
        } else if (e === "close") {
            this.setState(() => ({
                changeMenu: false,
                info: false
            }))
        } else if ("delet") {
            this.setState(() => ({
                changeMenu: false,
                info: false
            }))
            storeEvent.dispatch({type: "REMOVE_TASK", value: this.props.id})
        }
    }

    render() {
        let {color, name, id, details, type, data} = this.props
        let {info, changeMenu} = this.state

        const moreInfo = (<div style={{border: `1px solid ${color}`}}>
            <p>Описаие: {`${details}`}</p>
            <p> Тип: {`${type}`}</p>
            <p>Продолжительность: {`${data.start} - ${data.end}`}</p>
            <p>Цвет: <span style={{
                backgroundColor: color,
                width: '18px',
                height: '18px',
                display: "inline-block",
                borderRadius: "50%"
            }}></span></p>
            <div>
                {/*<span onClick={() => this.onChangeEvent("edit")}*/}
                {/*className={"checked-info-event-edit checked-info-event"}></span>*/}
                <span onClick={() => this.onChangeEvent("delet")}
                      className={"checked-info-event-delet checked-info-event"}></span>
                <span onClick={() => this.onChangeEvent("close")}
                      className={"checked-info-event-close checked-info-event"}></span>
            </div>
        </div>)

        const ControlerChangeEvent = (<div style={{border: `1px solid ${color}`}}>
            <Name excerpt={true}/>
            <Color excerpt={true}/>
            <Description excerpt={true}/>
            <div>
                <span onClick={() => this.onChangeEvent("edit")}
                      className={"checked-info-event-edit checked-info-event"}></span>
                <span onClick={() => this.onChangeEvent("delet")}
                      className={"checked-info-event-delet checked-info-event"}></span>
                <span onClick={() => this.onChangeEvent("close")}
                      className={"checked-info-event-close checked-info-event"}></span>
            </div>
        </div>)
        return <div className="event"><p className={'event-name'} id={id} onClick={() => this.onChangeEvent("info")}
                                         style={{borderBottom: `1px solid ${color}`}}>{name}</p>
            {info && changeMenu === false ? moreInfo : info && changeMenu ? ControlerChangeEvent : false}
        </div>
    }
}