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
  console.log("raw_data", raw_data2);
  data2 = raw_data2.filter(
    (d) => d.sat_math_quartile_1 !== 0 && d.median_earnings !== 0
  );

  const width_line = 500,
    height_line = 300,
    margin_line = { top: 20, bottom: 50, left: 60, right: 40 },
    radius = 3;

  // SCALES
  const xScale_line = d3
    .scaleLinear()
    .domain([0, d3.max(data2, (d) => d.sat_math_quartile_1)])
    .range([margin_line.left, width_line - margin_line.right]);
  console.log(xScale_line.domain());
  const yScale_line = d3
    .scaleLinear()
    .domain(d3.extent(data2, (d) => d.median_earnings))

    .range([height_line - margin_line.bottom, margin_line.top]);

  // AXES
  const xAxis_line = d3.axisBottom(xScale_line);
  const yAxis_line = d3.axisLeft(yScale_line); //.tickFormat(formatBillions);

  // create an svg element in our main `d3-container` element
  const svg_line = d3
    .select("#line-container")
    .append("svg")
    .attr("width", width_line)
    .attr("height", height_line);

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
    .attr("class", "dot") // Note: this is important so we can identify it in future updates
    .attr("r", radius)
    .attr("cy", (d) => yScale_line(d.median_earnings)) // initial value - to be transitioned
    .attr("cx", (d) => xScale_line(d.sat_math_quartile_1));

  //   svg_line
  //     .selectAll(".dot")
  //     .data(data2, (d) => d.name)
  //     .join("circle")
  //     .attr("class", "dot") // Note: this is important so we can identify it in future updates
  //     .attr("r", radius)
  //     .attr("fill", "blue")
  //     .attr("cy", (d) => yScale_line(d.sat_math_quartile_2)) // initial value - to be transitioned
  //     .attr("cx", (d) => xScale_line(d.median_earnings));
  //   svg_line
  //     // .append("path")
  //     .selectAll("path.trend")
  //     .data(data2)
  //     .join("path")
  //     .attr("d", (d) => lineFunc(d))
  //     .attr("fill", "black");
  //   // .enter();
  // .append("path")
  // .attr("class", "trend");
});
