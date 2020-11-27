// var width = 1000;
// var height = 500;

// //Create SVG element
// var svg = d3.select("#d3_cont")
// .append("svg")
// .attr("width", width)
// .attr("height", height)
// .style("background", "white")
// .style("border", "1px solid black");

// //Create line element inside SVG
// svg.append("line")
//    .attr("x1", 100)
//    .attr("x2", 500)
//    .attr("y1", 50)
//    .attr("y2", 50)
//    .attr("stroke", "black")

// set the dimensions and margins of the graph
var margin = { top: 10, right: 20, bottom: 30, left: 50 },
   width = 500 - margin.left - margin.right,
   height = 420 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#d3_cont")
   .append("svg")
   .attr("width", width + margin.left + margin.right)
   .attr("height", height + margin.top + margin.bottom)
   .style("border", "1px solid black")
   .style("background", "white")
   .append("g")
   .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

// Add X axis
var x = d3.scaleLinear()
   .domain([0, 10000])
   .range([0, width]);
svg.append("g")
   .attr("transform", "translate(0," + height + ")")
   .call(d3.axisBottom(x));

// Add Y axis
var y = d3.scaleLinear()
   .domain([35, 90])
   .range([height, 0]);
svg.append("g")
   .call(d3.axisLeft(y));

// Add a scale for bubble size
var z = d3.scaleLinear()
   .domain([200000, 1310000000])
   .range([1, 40]);

// create a tooltip
var Tooltip = d3.select("#d3_cont")
   .append("div")
   .attr("id", "hover_toottip")
   .style("opacity", 0)
   .attr("class", "tooltip")
   .style("background-color", "white")
   .style("border", "solid")
   .style("border-width", "2px")
   .style("border-radius", "5px")
   .style("padding", "5px");

// Three function that change the tooltip when user hover / move / leave a cell
var mouseover = function (d) {
   Tooltip
      .style("opacity", 1)
   d3.select(this)
      .style("stroke", "black")
      .style("opacity", 1)
}
var mousemove = function (event, data) {
   Tooltip
      .html(data.country)
      .style("left", (d3.pointer(event)[0] + 140) + "px")
      .style("top", (d3.pointer(event)[1] + 100) + "px")
}
var mouseleave = function (d) {
   Tooltip
      .style("opacity", 0)
   d3.select(this)
      .style("stroke", "none")
      .style("opacity", 0.8)
}

d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/4_ThreeNum.csv",
   (data) => {
      // console.log(data);

      // Add dots
      svg.append("g")
         // .attr("class", "new_class")
         // .attr("id", "c" + i++)
         // .selectAll(".new_class")
         .data([data])
         // .enter()
         .append("circle")
         .attr("cx", (d) => { return x(d.gdpPercap); })
         .attr("cy", (d) => { return y(d.lifeExp); })
         .attr("r", (d) => { return z(d.pop); })
         // .attr("cx", i + 300)
         // .attr("cy", i + 300)
         // .attr("r", 5)
         .style("fill", "black")
         .style("opacity", "0.7")
         .attr("stroke", "black")
         .on("mouseover", mouseover)
         .on("mousemove", (event, data) => {return mousemove(event, data)})
         .on("mouseleave", mouseleave);

   })
