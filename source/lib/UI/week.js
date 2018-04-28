import {timeCalculation} from "../logic/factory";
import React from "react";

const Week = () => timeCalculation().dayWeek.map(item => <div key={item}><p>{item}</p></div>)

export default Week