import {createEmptyDay} from "../logic/factory";

const EmptyDay = (props) => {
    let {monthCounter} = props
    let arr = createEmptyDay(monthCounter)
    return arr ? arr.map(item => item) : false
}

export default EmptyDay