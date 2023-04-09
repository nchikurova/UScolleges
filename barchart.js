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

d3.csv("./data/majorsTotal.csv", d3.autoType).then((data) => {
  console.log(data);
  data = data.sort((a, b) => b.total - a.total).filter((d) => d.total > 0.25);
  /** CONSTANTS */
  // constants help us reference the same values throughout our code
  let margin = { top: 0, bottom: 100, left: 60, right: 40 },
    width = 400, // - margin.left - margin.right,
    height = 500 - margin.bottom;
  paddingInner = 0.3;
  // console.log(d3.values(newData[0]).filter((s) => s.includes("major")));

  // /** SCALES */
  const yScale = d3
    .scaleBand()
    .domain(data.map((d) => d.majors))
    .range([margin.left, width - margin.right])
    .paddingInner(paddingInner);
  console.log(yScale.domain());

  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.total)])
    .range([height, margin.top]);
  console.log(xScale.domain());

  /** AXIS */
  // x Axis
  const xAxis = d3.axisBottom(xScale).tickValues([]);

  // y Axis
  const yAxis = d3.axisLeft(yScale);

  /** MAIN CODE */
  const svg = d3
    .select("#barchart-container")
    .append("svg")
    .attr("viewBox", "0 0 500 500")
    .attr("transform", "translate(0,0)");

  // const formatTotal = d3.format(",.2f");
  const toTitleCase = (phrase) => {
    return phrase
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  const formatMajors = (str) =>
    str.toLowerCase().slice(0, -10).replaceAll("_", " ");

  console.log(formatMajors("architecture_major_perc"));
  // TOOLTIP
  const tip_bar = d3
    .tip()
    .attr("class", "d3-tip")
    .html((d) => {
      let text = `<strong>Major: </strong><span
        style='color':'black'>${toTitleCase(
          formatMajors(d.majors)
        )}</span><br>`;
      text += `
        <strong>Total percentage: </strong><span>${d.total}</span><br>`;

      return text;
    });
  svg.call(tip_bar);

  // // append rects
  const rect = svg
    .selectAll("rect")
    .attr("class", "rect")
    .data(data)
    .join("rect")
    .attr("y", (d) => yScale(d.majors))
    .attr("x", margin.left + width / 3) //(d) => xScale(d.total))
    .attr("height", yScale.bandwidth())
    .attr("width", (d) => width - xScale(d.total))
    .attr("fill", "#806a98")
    .attr("stroke", "black")
    .attr("stroke-width", "1px")
    .attr("stroke-opacity", 1)

    .on("mouseover", tip_bar.show)
    .on("mouseout", tip_bar.hide);

  const text = svg
    .selectAll("text")
    .data(data)
    .join("text")
    .attr("class", "label")
    .attr("text-anchor", "end")
    // this allows us to position the text in the center of the bar
    .attr("y", (d) => yScale(d.majors) + 20)
    .text((d) => toTitleCase(formatMajors(d.majors)))
    .attr("x", margin.left + width / 3 - 10);
});

// adding button 'Read more' source:
// https://www.w3schools.com/howto/howto_js_read_more.asp
function readMore() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("myBtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Expand list";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Close list";
    moreText.style.display = "inline";
  }
}
