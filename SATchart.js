/**
 * LOAD DATA
 * */
d3.csv("./data/aveSat.csv", (d) => ({
  ave_quartile_2: +d.ave_quartile_2,
  unemployment_rate: +d.unemployment_rate,
})).then((raw_data2) => {
  //   console.log("raw_data", raw_data2);
  data2 = raw_data2.filter(
    (d) => d.ave_quartile_2 !== 0 && d.unemployment_rate !== 0
  );

  console.log(data2);
  let width_line = 400,
    height_line = 300,
    margin_line = { top: 20, bottom: 50, left: 60, right: 40 };

  // SCALES
  const xScale_line = d3
    .scaleLinear()
    .domain(d3.extent(data2, (d) => d.ave_quartile_2))
    .range([margin_line.left, width_line - margin_line.right]);

  const yScale_line = d3
    .scaleLinear()
    .domain(d3.extent(data2, (d) => d.unemployment_rate))
    .range([height_line - margin_line.bottom, margin_line.top]);

  // AXES
  const xAxis_line = d3.axisBottom(xScale_line);
  const yAxis_line = d3.axisLeft(yScale_line); //.tickFormat(formatBillions);

  // create an svg element in our main `d3-container` element
  const svg_line = d3
    .select("#SAT1-container")
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
    .text("Average SAT Score (Midpoint)");

  // add the yAxis
  svg_line
    .append("g")
    .attr("class", "axis y-axis3")
    .attr("transform", `translate(${margin_line.left},0)`)
    .call(yAxis_line)
    .append("text")
    .attr("class", "axis-label3")
    .attr("y", "50%")
    .attr("dx", "-3em")
    .attr("text-anchor", "end")
    .attr("writing-mode", "vertical-rl")
    // .attr("transform", "rotate(-180)")
    .text("Unemployment Rate (%)");

  d3.select("g.y-axis2").call(yAxis_line);

  svg_line
    .selectAll(".dot")
    .data(data2)
    .join("circle")
    .attr("class", "dot")
    .attr("fill", "#806a98")
    .attr("r", 2)
    .attr("opacity", "0.5")
    .attr("cy", (d) => yScale_line(d.unemployment_rate))
    .attr("cx", (d) => xScale_line(d.ave_quartile_2));

  svg_line
    .append("line")
    .attr("stroke", "#801322")
    .attr("stroke-width", "2px")
    .style("stroke-dasharray", "4, 3")
    .attr("x1", margin_line.left)
    .attr("y1", height_line / 2 + 5)
    .attr("x2", width_line - margin_line.right)
    .attr("y2", height_line - height_line / 3);
});

// SAT score vs median_earnings
// **
//  * LOAD DATA
//  * */
d3.csv("./data/SATmedEarn.csv", (d) => ({
  median_earnings: +d.median_earnings,
  ave_quartile_2: +d.ave_quartile_2,
})).then((raw_data3) => {
  //   console.log("raw_data", raw_data2);
  data3 = raw_data3.filter(
    (d) => d.ave_quartile_2 !== 0 && d.median_earnings !== 0
  );

  console.log(data3);
  let width_line2 = 400,
    height_line2 = 300,
    margin_line2 = { top: 20, bottom: 50, left: 60, right: 40 };

  // SCALES
  const xScale_line2 = d3
    .scaleLinear()
    .domain(d3.extent(data3, (d) => d.ave_quartile_2))
    .range([margin_line2.left, width_line2 - margin_line2.right]);

  const yScale_line2 = d3
    .scaleLinear()
    .domain(d3.extent(data3, (d) => d.median_earnings))
    .range([height_line2 - margin_line2.bottom, margin_line2.top]);

  // AXES
  const xAxis_line2 = d3.axisBottom(xScale_line2);
  const yAxis_line2 = d3.axisLeft(yScale_line2); //.tickFormat(formatBillions);

  // create an svg element in our main `d3-container` element
  const svg_line2 = d3
    .select("#SAT2-container")
    .append("svg")
    .attr("viewBox", "0 0 400 300")
    .attr("transform", "translate(0,0)");

  // add the xAxis
  svg_line2
    .append("g")
    .attr("class", "axis x-axis2")
    .attr("transform", `translate(0,${height_line2 - margin_line2.bottom})`)
    .call(xAxis_line2)
    .append("text")
    .attr("class", "axis-label2")
    .attr("x", "50%")
    .attr("dy", "3em")
    .text("Average SAT Score (Midpoint)");

  // add the yAxis
  svg_line2
    .append("g")
    .attr("class", "axis y-axis2")
    .attr("transform", `translate(${margin_line2.left},0)`)
    .call(yAxis_line2)
    .append("text")
    .attr("class", "axis-label2")
    .attr("y", "50%")
    .attr("dx", "-4em")
    .attr("writing-mode", "vertical-rl")
    .text("Median Earnings");

  d3.select("g.y-axis2").call(yAxis_line2);

  svg_line2
    .selectAll(".dot")
    .data(data3, (d) => d.name)
    .join("circle")
    .attr("class", "dot")
    .attr("fill", "#806a98")
    .attr("r", 2)
    .attr("opacity", "0.5")
    .attr("cy", (d) => yScale_line2(d.median_earnings))
    .attr("cx", (d) => xScale_line2(d.ave_quartile_2));

  svg_line2
    .append("line")
    .attr("stroke", "#801322")
    .attr("stroke-width", "2px")
    .style("stroke-dasharray", "4, 3")
    .attr("x1", margin_line2.left)
    .attr("y1", height_line2 - 60)
    .attr("x2", width_line2 - margin_line2.right)
    .attr("y2", height_line2 - 150);
});
