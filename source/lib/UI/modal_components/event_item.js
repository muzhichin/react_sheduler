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
        switch (e) {
            case "info" :
                this.setState(() => ({
                    info: !this.state.info,
                    changeMenu: false
                }))
                break
            case "edit" :
                this.setState(() => ({
                    changeMenu: !this.state.changeMenu
                }))
                break
            case "close" :
                this.setState(() => ({
                    changeMenu: false,
                    info: false
                }))
                break
            case "delet" :
                storeEvent.dispatch({type: "REMOVE_TASK", value: this.props.id})
                this.setState(() => ({
                    changeMenu: false,
                    info: false
                }))
                break
        }
    }

    render() {
        let {color, name, id, details, type, data} = this.props
        let {info, changeMenu} = this.state

        const moreInfo = (<div className={"infoEvent"} style={{borderBottom: `1px solid ${color}`}}>
            <p>Описаие: <span style={{color: `${color}`}}>{`${details}`}</span></p>
            <p> Тип: <span style={{color: `${color}`}}>{`${type}`}</span></p>
            <p>Продолжительность: <br/><span style={{color: `${color}`}}>{`${data.start} - ${data.end}`}</span></p>
            <p style={{display: "inline", position: "relative"}}>Цвет:<span style={{
                backgroundColor: color,
                width: "18px",
                height: "18px",
                display: "block",
                borderRadius: "50%",
                right: "-24px",
                margin: "auto",
                position: "absolute",
                top: 0,
                bottom: 0
            }}></span></p>
            <div className={"panelChangeEvent"}>
                {type === "Google event" ? false : <span onClick={() => this.onChangeEvent("delet")}
                                                         className={"checked-info-event-delet checked-info-event"}></span>}
                <span onClick={() => this.onChangeEvent("close")}
                      className={"checked-info-event-close checked-info-event"}></span>
            </div>
        </div>)

        // const ControlerChangeEvent = (<div style={{border: `1px solid ${color}`}}>
        //     <Name excerpt={true}/>
        //     <Color excerpt={true}/>
        //     <Description excerpt={true}/>
        //     <div>
        //         <span onClick={() => this.onChangeEvent("edit")}
        //               className={"checked-info-event-edit checked-info-event"}></span>
        //         <span onClick={() => this.onChangeEvent("delet")}
        //               className={"checked-info-event-delet checked-info-event"}></span>
        //         <span onClick={() => this.onChangeEvent("close")}
        //               className={"checked-info-event-close checked-info-event"}></span>
        //     </div>
        // </div>)
        return <div className="event"><p className={'event-name'} id={id} onClick={() => this.onChangeEvent("info")}
                                         style={{borderBottom: `1px solid ${color}`}}>{name}</p>
            {info && changeMenu === false ? moreInfo : info && changeMenu ? ControlerChangeEvent : false}
        </div>
    }
}