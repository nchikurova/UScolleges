/**
 * CONSTANTS AND GLOBALS
 * */

//   default_selection = "Select a Country";

/** these variables allow us to access anything we manipulate in
 * init() but need access to in draw().
 * All these variables are empty before we assign something to them.*/
// let svg_line;
// let xScale_line;
// let yScale_line;
// let yAxis_line;

/* 
this extrapolated function allows us to replace the "G" with "B" min the case of billions.
we cannot do this in the .tickFormat() because we need to pass a function as an argument, 
and replace needs to act on the text (result of the function). 
*/

/**
 * APPLICATION STATE
 * */

/**
 * LOAD DATA
 * */
d3.csv("./data/UScolleges.csv", (d) => ({
  sat_math_quartile_3: +d.sat_math_quartile_3,
  sat_math_quartile_2: +d.sat_math_quartile_2,
  sat_math_quartile_1: +d.sat_math_quartile_1,
  median_earnings: +d.median_earnings,
  name: d.institution_name,
})).then((raw_data2) => {
  //   console.log("raw_data", raw_data2);
  data2 = raw_data2.filter(
    (d) => d.sat_math_quartile_1 !== 0 && d.median_earnings !== 0
  );
  console.log(data2);
  let width_line = 400,
    height_line = 300,
    margin_line = { top: 20, bottom: 50, left: 60, right: 40 },
    radius = 3;

  // SCALES
  const xScale_line = d3
    .scaleLinear()
    .domain([0, d3.max(data2, (d) => d.sat_math_quartile_1)])
    .range([margin_line.left, width_line - margin_line.right]);
  //   console.log(xScale_line.domain());
  const yScale_line = d3
    .scaleLinear()
    .domain(d3.extent(data2, (d) => d.median_earnings))

    .range([height_line - margin_line.bottom, margin_line.top]);

  // AXES
  const xAxis_line = d3.axisBottom(xScale_line);
  const yAxis_line = d3.axisLeft(yScale_line); //.tickFormat(formatBillions);

  // create an svg element in our main `d3-container` element
  const svg_line = d3
    .select("#SAT-container")
    .append("svg")
    .attr("viewBox", "0 0 400 300")
    .attr("transform", "translate(0,0)");

  // add the xAxis
  svg_line
    .append("g")
    .attr("class", "axis x-axis2")
    .attr("transform", `translate(0,${height_line - margin_line.bottom})`)
    .call(xAxis_line)
    .append("text")
    .attr("class", "axis-label2")
    .attr("x", "50%")
    .attr("dy", "3em")
    .text("SAT Score");

  // add the yAxis
  svg_line
    .append("g")
    .attr("class", "axis y-axis2")
    .attr("transform", `translate(${margin_line.left},0)`)
    .call(yAxis_line)
    .append("text")
    .attr("class", "axis-label2")
    .attr("y", "50%")
    .attr("dx", "-3em")
    .attr("writing-mode", "vertical-rl")
    .text("Median Earnings");

  //   yScale_line.domain([0, d3.max(data2, (d) => d.median_earnings)]);

  d3.select("g.y-axis2").call(yAxis_line); //.scale(yScale_line)); // this updates the yAxis' scale to be our newly updated one

  // we define our line function generator telling it how to access the x,y values for each point
  //   const lineFunc = d3
  //     .line()
  //     .x((d) => xScale_line(d.median_earnings))
  //     .y((d) => yScale_line(d.sat_math_quartile_3));

  svg_line
    .selectAll(".dot")
    .data(data2, (d) => d.name)
    .join("circle")
    .attr("class", "dot")
    .attr("fill", "#806a98")
    .attr("opacity", 0.3) // Note: this is important so we can identify it in future updates
    .attr("r", radius)
    .attr("cy", (d) => yScale_line(d.median_earnings)) // initial value - to be transitioned
    .attr("cx", (d) => xScale_line(d.sat_math_quartile_1));

  svg_line
    .append("line")
    .attr("stroke", "#801322")
    // .attr("stroke-width", 3)
    .style("stroke-dasharray", "3, 3")
    .attr("x1", 185)
    .attr("y1", height_line - margin_line.bottom)
    .attr("x2", width + 20)
    .attr("y2", 50);
  var regLine = d3
    .line()
    .xScale_line((d) => xScale_line(d.sat_math_quartile_1))
    .yScale_line((d) => yScale_line(d.median_earnings));

  // Derive a linear regression
  var regression = ss.linearRegression(
    data2.map(function (d) {
      return [
        +d.items[[0].indexOf("sat_math_quartile_1")],
        +d.items[[1].indexOf("median_earnings")],
      ];
    })
  );

  var lin = ss.linearRegressionLine(regression);

  // Create a line based on the beginning and endpoints of the range
  var lindata = xScale_line.domain().map(function (x) {
    return {
      SAT: xScale_line,
      Earnings: lin(+xScale_line),
    };
  });

  svg_line
    .append("path")
    .datum(lindata)
    .attr("class", "reg")
    .style("stroke-dasharray", "3, 3")
    .attr("stroke", "#319455")
    .attr("stroke-width", 1)
    .attr("d", regLine);
});