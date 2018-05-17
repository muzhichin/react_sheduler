import React from "react";

export default class EventItem extends React.Component {
    constructor(props) {
        super(props)
        this.onChangeEvent = this.onChangeEvent.bind(this)
        this.state = {
            info: false,
            changeMenu: false
        }
    }

    onChangeEvent() {
        this.setState(prevState => ({
            info: !this.state.info,
        }))
    }

    render() {
        let {color, name, id, details, type, data} = this.props
        let {info, changeMenu} = this.state
        return <div className="event"><p className={'event-name'} id={id} onClick={this.onChangeEvent}
                                         style={{borderBottom: `1px solid ${color}`}}>{name}</p>
            {info ? <div style={{border: `1px solid ${color}`}}>
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
                    <span onClick={() => this.onChangeEvent("edit")}
                          className={"checked-info-event-edit checked-info-event"}></span>
                    <span onClick={() => this.onChangeEvent()}
                          className={"checked-info-event-delet checked-info-event"}></span>
                    <span onClick={() => this.onChangeEvent()}
                          className={"checked-info-event-close checked-info-event"}></span>
                </div>
            </div> : false}
        </div>
    }
}