// data load
// reference for d3.autotype: https://github.com/d3/d3-dsv#autoType
// d3.csv("./data/UScolleges.csv", d3.autoType).then((data) => {
//   console.log(data);

//   const newData = data
//     .filter((d) => d.median_earnings >= 80000) // && d.cost !== null)
//     .sort((a, b) => b.median_earnings - a.median_earnings);
//   // console.log(newData);
//   const majors = d3.keys(newData[0]).filter((s) => s.includes("major"));
//   // console.log(majors);
//   /** CONSTANTS */
//   // constants help us reference the same values throughout our code
//   let margin = { top: 20, bottom: 100, left: 75, right: 40 },
//     width = 400, // - margin.left - margin.right,
//     height = 200 - margin.bottom, // - margin.bottom
//     paddingInner = 0.2;
//   // console.log(d3.values(newData[0]).filter((s) => s.includes("major")));

//   let majors2 = [];

//   const result = newData.reduce((acc, curr) => {
//     const matchingKeys = Object.keys(curr).filter((key) =>
//       key.includes("_major_")
//     );
//     const data = [curr.institution_name];
//     matchingKeys.forEach((key) => {
//       data.push({ [key]: curr[key] });
//     });
//     acc.push(data);
//     return acc;
//   }, []);
//   console.log(result);

//   const collegeDataObject = newData.reduce((acc, curr) => {
//     const filteredKeys = Object.keys(curr).filter((key) =>
//       key.includes("_major_")
//     );
//     const data = { id: curr.id };
//     for (const key of filteredKeys) {
//       data[key] = curr[key];
//     }
//     acc.push(data);
//     return acc;
//   }, []);

//   console.log(collegeDataObject);

//   // // const subgroups = result.forEach((arr) => {
//   // //     arr.forEach((college_name) => {

//   // //     })
//   // // })

//   // const groupByCollege = d3
//   //   .nest()
//   //   .key((d) => d.median_earnings)
//   //   // .rollup(newData, (d) => d.filter((s) => s.includes("major")))
//   //   .entries(newData);
//   // console.log(groupByCollege);
//   // console.log(d3.values(groupByCollege[3]));

//   // let majors = [];

//   // /** SCALES */
//   const xScale = d3
//     .scaleBand()
//     .domain(newData.map((d) => d.institution_name))
//     .range([margin.left, width - margin.right])
//     .paddingInner(paddingInner);
//   console.log(xScale.domain());

//   const yScale = d3
//     .scaleLinear()
//     .domain([0, d3.max(newData, (d) => d.median_earnings)])
//     .range([height, margin.top]);
//   console.log(yScale.domain());

//   /** AXIS */
//   // x Axis
//   const xAxis = d3.axisBottom(xScale).tickValues([]);

//   // y Axis
//   const yAxis = d3
//     .axisLeft(yScale)
//     // .tickFormat(d3.format(".2s"))
//     .ticks(6, ".2s");

//   /** MAIN CODE */
//   const svg = d3
//     .select("#barchart-container")
//     .append("svg")
//     .attr("viewBox", "0 0 400 200")
//     .attr("transform", "translate(0,0)");

//   svg
//     .append("g")
//     .attr("class", "axis")
//     .attr("transform", `translate(0,${height})`)
//     .call(xAxis)
//     .append("text")
//     .attr("class", "axis-label")
//     .attr("x", "60%")
//     .attr("y", "20")
//     .text("Institution");
//   svg
//     .append("g")
//     .attr("class", "y axis")
//     .attr("transform", `translate(${margin.left},0)`)
//     .call(yAxis)
//     .append("text")
//     .attr("class", "axis-label")
//     .attr("y", "30%")
//     .attr("dx", "-5em")
//     .attr("writing-mode", "vertical-rl")
//     .text("Median Earnings, $");

//   // // TOOLTIP

//   const formatNumbers = d3.format(",.2f");
//   const tip = d3
//     .tip()
//     .attr("class", "d3-tip")
//     .html((d) => {
//       let text = `<strong>Location: </strong><span
//         style='color':'black'>${d.state}</span><br>`;
//       text += `
//         <strong>Institution Name: </strong><span>${d.institution_name}</span><br>`;

//       text += `
//         <strong>Cost: </strong><span>${d.eng_tech_major_perc}</span><br>
//         `;
//       text += `
//         <strong>Median Earnings: </strong><span>$${formatNumbers(
//           d.median_earnings
//         )}</span><br>
//         `;
//       text += `
//      <strong>Major: </strong><span>${d.architecture_major_perc},${d.bio_science_major_perc},${d.business_marketing_major_perc},

//       }</span><br>
//         `;
//       return text;
//     });
//   svg.call(tip);

//   // // append rects
//   const rect = svg
//     .selectAll("rect")
//     .attr("class", "bars")
//     .data(newData)
//     .join("rect")
//     .attr("y", (d) => yScale(d.median_earnings))
//     .attr("x", (d) => xScale(d.institution_name))

//     .attr("width", xScale.bandwidth())
//     .attr("height", (d) => height - yScale(d.median_earnings))
//     .attr("fill", "rgb(45, 114, 130)")
//     .on("mouseover", tip.show)
//     .on("mouseout", tip.hide);
// });

//----------------------------------------------------------------------------------
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
