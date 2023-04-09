/**
 * LOAD DATA
 * */
d3.csv("./data/UScolleges.csv", (d) => ({
  sat_math_quartile_3: +d.sat_math_quartile_3,
  sat_math_quartile_2: +d.sat_math_quartile_2,
  sat_math_quartile_1: +d.sat_math_quartile_1,
  sat_verbal_quartile_2: +d.sat_verbal_quartile_2,
  sat_writing_quartile_2: +d.sat_writing_quartile_2,
  median_earnings: +d.median_earnings,
  name: d.institution_name,
  unemployment_rate: +d.unemployment_rate,
})).then((raw_data2) => {
  //   console.log("raw_data", raw_data2);
  data2 = raw_data2.filter(
    (d) => d.sat_math_quartile_2 !== 0 && d.unemployment_rate !== 0
  );

  console.log(data2);
  let width_line = 400,
    height_line = 200,
    margin_line = { top: 20, bottom: 50, left: 60, right: 40 };

  // SCALES
  const xScale_line = d3
    .scaleLinear()
    .domain([0, d3.max(data2, (d) => d.sat_math_quartile_2)])
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
    .select("#SAT2-container")
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

  d3.select("g.y-axis2").call(yAxis_line);

  svg_line
    .selectAll(".dot")
    .data(data2, (d) => d.name)
    .join("circle")
    .attr("class", "dot")
    .attr("fill", "#806a98")
    .attr("r", 2)
    .attr("cy", (d) => yScale_line(d.unemployment_rate))
    .attr("cx", (d) => xScale_line(d.sat_math_quartile_2));

  svg_line
    .append("line")
    .attr("stroke", "#801322")
    .attr("stroke-width", "2px")
    .style("stroke-dasharray", "4, 3")
    .attr("x1", margin_line.left)
    .attr("y1", height_line / 2 + 5)
    .attr("x2", width_line - margin_line.right)
    .attr("y2", height_line - height_line / 3);

  // ATTEMPT TO ADD LINEAR REGRESSION THOUGH SIMPLE STATISTICS

  // var regLine = d3
  //   .line()
  //   .xScale_line((d) => xScale_line(d.sat_math_quartile_1))
  //   .yScale_line((d) => yScale_line(d.median_earnings));

  // // Derive a linear regression
  // var regression = ss.linearRegression(
  //   data2.map(function (d) {
  //     return [
  //       +d.items[[0].indexOf("sat_math_quartile_1")],
  //       +d.items[[1].indexOf("median_earnings")],
  //     ];
  //   })
  // );

  // var lin = ss.linearRegressionLine(regression);

  // // Create a line based on the beginning and endpoints of the range
  // var lindata = xScale_line.domain().map(function (x) {
  //   return {
  //     SAT: xScale_line,
  //     Earnings: lin(+xScale_line),
  //   };
  // });

  // svg_line
  //   .append("path")
  //   .datum(lindata)
  //   .attr("class", "reg")
  //   .style("stroke-dasharray", "3, 3")
  //   .attr("stroke", "#319455")
  //   .attr("stroke-width", 1)
  //   .attr("d", regLine);
});

// **
//  * LOAD DATA
//  * */
d3.csv("./data/UScolleges.csv", (d) => ({
  sat_math_quartile_3: +d.sat_math_quartile_3,
  sat_math_quartile_2: +d.sat_math_quartile_2,
  sat_math_quartile_1: +d.sat_math_quartile_1,
  sat_verbal_quartile_2: +d.sat_verbal_quartile_2,
  sat_writing_quartile_2: +d.sat_writing_quartile_2,
  median_earnings: +d.median_earnings,
  name: d.institution_name,
  unemployment_rate: +d.unemployment_rate,
})).then((raw_data3) => {
  //   console.log("raw_data", raw_data2);
  data3 = raw_data3.filter(
    (d) => d.sat_math_quartile_2 !== 0 && d.unemployment_rate !== 0
  );

  console.log(data3);
  let width_line2 = 400,
    height_line2 = 200,
    margin_line2 = { top: 20, bottom: 50, left: 60, right: 40 };

  // SCALES
  const xScale_line2 = d3
    .scaleLinear()
    .domain([0, d3.max(data2, (d) => d.sat_math_quartile_2)])
    .range([margin_line2.left, width_line2 - margin_line2.right]);

  const yScale_line2 = d3
    .scaleLinear()
    .domain(d3.extent(data2, (d) => d.unemployment_rate))
    .range([height_line2 - margin_line2.bottom, margin_line2.top]);

  // AXES
  const xAxis_line2 = d3.axisBottom(xScale_line2);
  const yAxis_line2 = d3.axisLeft(yScale_line2); //.tickFormat(formatBillions);

  // create an svg element in our main `d3-container` element
  const svg_line2 = d3
    .select("#SAT1-container")
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
    .text("SAT Score");

  // add the yAxis
  svg_line2
    .append("g")
    .attr("class", "axis y-axis2")
    .attr("transform", `translate(${margin_line2.left},0)`)
    .call(yAxis_line2)
    .append("text")
    .attr("class", "axis-label2")
    .attr("y", "50%")
    .attr("dx", "-3em")
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
    .attr("cy", (d) => yScale_line2(d.unemployment_rate))
    .attr("cx", (d) => xScale_line2(d.sat_math_quartile_2));

  svg_line2
    .append("line")
    .attr("stroke", "#801322")
    .attr("stroke-width", "2px")
    .style("stroke-dasharray", "4, 3")
    .attr("x1", margin_line2.left)
    .attr("y1", height_line2 / 2 + 5)
    .attr("x2", width_line2 - margin_line2.right)
    .attr("y2", height_line2 - height_line2 / 3);
});
