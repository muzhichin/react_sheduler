import React from "react";
import {
    timeFormat,
    select,
    scaleTime,
    max,
    min,
    scaleLinear,
    rgb,
    axisBottom,
    timeDay,
    interpolateHclLong,
    timeParse
} from "d3";

import {dayTaskmanSort, substrateData, oneDayMore} from "../logic/factory";
import {storeEvent, storeGoogle, store} from "../store";
import {_modalHidden} from "../store/actions";


export default class ChartTasks extends React.Component {
    constructor(props) {
        super(props)
        this.createBarChart = this.createBarChart.bind(this)
    }

    componentWillMount() {
        this.unsubscribe = storeEvent.subscribe(
            () => this.forceUpdate()
        )
        this.unsubscribeGoogle = storeGoogle.subscribe(
            () => this.forceUpdate()
        )
    }

    componentWillUnmount() {
        this.unsubscribe()
        this.unsubscribeGoogle()
    }

    componentDidMount() {
        this.createBarChart()
    }

    componentWillUpdate() {
        select("#parentChart").remove();

    }

    componentDidUpdate() {
        this.createBarChart()
    }

    createBarChart() {
        const w = 700, h = 400;
        let taskArray = dayTaskmanSort(this.props.monthCounter)
        if (taskArray.length === 0) {
            taskArray = [{
                dataOnlyMount: {
                    "start": `${substrateData(this.props.monthCounter).dataStartOf}`,
                    "end": `${substrateData(this.props.monthCounter).dataEndOf}`
                },
                type: " ",
                details: "",
                name: "No tasks",
                id: "a1111111",
                color: "none"
            }]
        }

        let svg = select("#chart")
            .append("svg")
            .attr("width", w)
            .attr("id", 'parentChart')
            .attr("height", h)
            .attr("class", "svg");


        let dateFormat = timeParse("%Y-%m-%d");

        let timeScale = scaleTime()
            .domain([min(taskArray, function (d) {
                return dateFormat(d.dataOnlyMount.start);
            }),
                max(taskArray, function (d) {
                    return dateFormat(oneDayMore(d.dataOnlyMount.end));
                })])
            .range([0, w - 150])
            .nice();

        let categories = taskArray.map(item => item.type);

        let catsUnfiltered = categories; //for vert labels

        categories = checkUnique(categories);


        makeGant(taskArray, w, h);

        let title = svg.append("text")
            .text("Задачи на месяц")
            .attr("x", w / 2)
            .attr("y", 25)
            .attr("text-anchor", "middle")
            .attr("font-size", 18)
            .attr("fill", "#009FFC");


        function makeGant(tasks, pageWidth, pageHeight) {

            let barHeight = 20;
            let gap = barHeight + 4;
            let topPadding = 75;
            let sidePadding = 120;

            let colorScale = scaleLinear()
                .domain([0, categories.length])
                .range(["#00B9FA", "#F95002"])
                .interpolate(interpolateHclLong);

            makeGrid(sidePadding, topPadding, pageWidth, pageHeight);
            drawRects(tasks, gap, topPadding, sidePadding, barHeight, colorScale, pageWidth, pageHeight);
            vertLabels(gap, topPadding, sidePadding, barHeight, colorScale);

        }


        function drawRects(theArray, theGap, theTopPad, theSidePad, theBarHeight, theColorScale, w, h) {

            let bigRects = svg.append("g")
                .selectAll("rect")
                .data(theArray)
                .enter()
                .append("rect")
                .attr("x", 0)
                .attr("y", function (d, i) {
                    return i * theGap + theTopPad - 2;
                })
                .attr("width", function (d) {
                    return w;
                })
                .attr("height", theGap)
                .attr("stroke", "none")
                .attr("fill", function (d) {
                    for (let i = 0; i < categories.length; i++) {
                        if (d.type == categories[i]) {
                            return rgb(theColorScale(i));
                        }
                    }
                })
                .attr("opacity", 0.2);


            let rectangles = svg.append('g')
                .selectAll("rect")
                .data(theArray)
                .enter();


            let innerRects = rectangles.append("rect")
                .attr("rx", 3)
                .attr("ry", 3)
                .attr("class", "rectBlock")
                .attr("x", function (d) {
                    return timeScale(dateFormat(d.dataOnlyMount.start)) + theSidePad;
                })
                .attr("y", function (d, i) {
                    return i * theGap + theTopPad;
                })
                .attr("width", function (d) {
                    return (timeScale(dateFormat(oneDayMore(d.dataOnlyMount.end))) - timeScale(dateFormat(d.dataOnlyMount.start)));
                })
                .attr("height", theBarHeight)
                .attr("stroke", "none")
                .attr("fill", function (d) {
                    for (let i = 0; i < categories.length; i++) {
                        if (d.type == categories[i]) {
                            // return rgb(theColorScale(i));
                            return d.color;
                        }
                    }
                })


            let rectText = rectangles.append("text")
                .text(function (d) {
                    return d.name;
                })
                .attr("x", function (d) {
                    return (timeScale(dateFormat(d.dataOnlyMount.end)) - timeScale(dateFormat(d.dataOnlyMount.start))) / 2 + timeScale(dateFormat(d.dataOnlyMount.start)) + theSidePad;
                })
                .attr("y", function (d, i) {
                    return i * theGap + 14 + theTopPad;
                })
                .attr("font-size", 11)
                .attr("text-anchor", "middle")
                .attr("text-height", theBarHeight)
                .attr("fill", "#000000")


            let innerRectsOpacity = rectangles.append("rect")
                .attr("rx", 3)
                .attr("ry", 3)
                .attr("class", "rectBlock")
                .attr("x", function (d) {
                    return timeScale(dateFormat(d.dataOnlyMount.start)) + theSidePad;
                })
                .attr("y", function (d, i) {
                    return i * theGap + theTopPad;
                })
                .attr("width", function (d) {
                    return (timeScale(dateFormat(oneDayMore(d.dataOnlyMount.end))) - timeScale(dateFormat(d.dataOnlyMount.start)));
                })
                .attr("height", theBarHeight)
                .attr("stroke", "none")
                .attr("opacity", 0)
                .attr("class", "rect-chart-event")
                .attr("data-name", "rect-chart-event")


            innerRectsOpacity.on('mouseover', function (e) {
                let tag = "";
                if (select(this).data()[0].details != undefined) {
                    tag = "Task: " + select(this).data()[0].name + "<br/>" +
                        "Type: " + select(this).data()[0].type + "<br/>" +
                        "Starts: " + select(this).data()[0].data.start + "<br/>" +
                        "Ends: " + select(this).data()[0].data.end + "<br/>" +
                        "Details: " + select(this).data()[0].details;
                } else {
                    tag = "Task: " + select(this).data()[0].name + "<br/>" +
                        "Type: " + select(this).data()[0].type + "<br/>" +
                        "Starts: " + select(this).data()[0].data.start + "<br/>" +
                        "Ends: " + select(this).data()[0].data.end;
                }
                let output = document.getElementById("tag");

                let x = (this.x.animVal.value + this.width.animVal.value / 2) + "px";
                let y = this.y.animVal.value + 35 + "px";

                output.innerHTML = tag;
                output.style.top = y;
                output.style.left = x;
                output.style.display = "block";
            }).on('mouseout', function () {
                let output = document.getElementById("tag");
                output.style.display = "none";

            })

            innerRectsOpacity.on('click', function (e) {
                let obj = {events: [select(this).data()[0]], data: select(this).data()[0].dataOnlyMount.start}
                store.dispatch(_modalHidden(true, obj))
            })

        }


        function makeGrid(theSidePad, theTopPad, w, h) {

            let xAxis = axisBottom(timeScale)
                .ticks(timeDay, 1)
                .tickSize(-h + theTopPad + 20, 0, 0)
                .tickFormat(timeFormat('%d'))


            let grid = svg.append('g')
                .attr('class', 'grid')
                .attr('transform', 'translate(' + theSidePad + ', ' + (h - 50) + ')')
                .call(xAxis);

            grid.selectAll("line")
                .attr("stroke", "#269fd8");

            grid.selectAll("text")
                .style("text-anchor", "middle")
                .attr("fill", "#000000")
                .attr("font-size", 10)
                .attr("dy", "1em");
        }

        function vertLabels(theGap, theTopPad, theSidePad, theBarHeight, theColorScale) {
            let numOccurances = [];
            let prevGap = 0;

            for (let i = 0; i < categories.length; i++) {
                numOccurances[i] = [categories[i], getCount(categories[i], catsUnfiltered)];
            }

            let axisText = svg.append("g") //without doing this, impossible to put grid lines behind text
                .selectAll("text")
                .data(numOccurances)
                .enter()
                .append("text")
                .text(function (d) {
                    return d[0];
                })
                .attr("x", 10)
                .attr("y", function (d, i) {
                    if (i > 0) {
                        for (let j = 0; j < i; j++) {
                            prevGap += numOccurances[i - 1][1];
                            return d[1] * theGap / 2 + prevGap * theGap + theTopPad;
                        }
                    } else {
                        return d[1] * theGap / 2 + theTopPad;
                    }
                })
                .attr("font-size", 11)
                .attr("text-anchor", "start")
                .attr("text-height", 14)
                .attr("fill", function (d) {
                    for (let i = 0; i < categories.length; i++) {
                        if (d[0] == categories[i]) {
                            return rgb(theColorScale(i)).darker();
                        }
                    }
                });

        }

//from this stackexchange question: http://stackoverflow.com/questions/1890203/unique-for-arrays-in-javascript
        function checkUnique(arr) {
            let hash = {}, result = [];
            for (let i = 0, l = arr.length; i < l; ++i) {
                if (!hash.hasOwnProperty(arr[i])) { //it works with objects! in FF, at least
                    hash[arr[i]] = true;
                    result.push(arr[i]);
                }
            }
            // console.log(result)
            // console.log(arr)

            return result;
        }

//from this stackexchange question: http://stackoverflow.com/questions/14227981/count-how-many-strings-in-an-array-have-duplicates-in-the-same-array
        function getCounts(arr) {
            let i = arr.length, // let to loop over
                obj = {}; // obj to store results
            while (i) obj[arr[--i]] = (obj[arr[i]] || 0) + 1; // count occurrences
            return obj;
        }

// get specific from everything
        function getCount(word, arr) {
            return getCounts(arr)[word] || 0;
        }
    }

    render() {
        return <div id={"chart"}>
            <div id={"tag"}></div>
        </div>
    }
}