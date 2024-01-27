console.log("Hello yammi.");

const data = [
    { id: 'd1', value: 30, region: 'Seoul', type: 0 },
    { id: 'd2', value: 52, region: 'Busan', type: 0 },
    { id: 'd3', value: 41, region: 'Ulsan', type: 0 },
    { id: 'd4', value: 105, region: 'Deagu', type: 1 },
    { id: 'd5', value: 42, region: 'Jeju', type: 0 },
    { id: 'd6', value: 32, region: 'Hwasung', type: 0 },    
    { id: 'd7', value: 62, region: 'Incheon', type: 0 }
]

const spec1 = 90
const spec2 = 80

function DrawBarChart() {
    var margin = { top: 30, right: 30, bottom: 70, left: 60 },
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#bar-chart").attr('class', 'bar-chart')
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    //X, Y Scale 설정
    var yMax = d3.max(data, function (d) { return d.value; })
    var xScale = d3.scaleBand().domain(data.map(d => d.region)).rangeRound([0, width]).padding(0.3);
    //var yScale = d3.scaleLog().domain([1, 1000]).range([height,0]);
    var yScale = d3.scaleLinear().domain([0, yMax + 15]).range([height, 0]);

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end")
        .attr("font-size", "12px");

    svg.append('g').call(d3.axisLeft(yScale));

    let bars = svg.selectAll('.bar')
        .data(data)
        .enter()
        .append('g')

    bars.append('rect')
        .attr('x', function (d) { return xScale(d.region) })
        .attr('y', function (d) { return yScale(d.value) })
        .attr('width', xScale.bandwidth())
        .attr('height', function (d) {
            return height - yScale(d.value);
        })        
        .attr('stroke', 'black')
        .attr('fill', function (d) {
            if (d.type == 1) {
                return '#F0DB4F';
            } else {
                return '#0083D6';
            }
        })
        .attr('class','cripsEdge-stroke')

    bars.append('text')
        .text(function (d) {
            return d.value;
        })
        .attr('x', function (d) { return xScale(d.region) + xScale.bandwidth()/2 })
        .attr('y', function (d) {
            return yScale(d.value + 3);
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "11px")
        .attr("fill", "black")
        .attr("text-anchor", "middle");

    svg.append('line')
    .style('stroke', 'indianred')
    .style('stroke-dasharray','3,3')
    .attr('x1',0)
    .attr('x2',width)
    .attr('y1',yScale(spec1))
    .attr('y2',yScale(spec1))

    svg.append('line')
    .style('stroke', 'teal')
    .style('stroke-dasharray','2,2')
    .attr('x1',0)
    .attr('x2',width)
    .attr('y1',yScale(spec2))
    .attr('y2',yScale(spec2))

}