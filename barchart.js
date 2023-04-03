// data load
// reference for d3.autotype: https://github.com/d3/d3-dsv#autoType
d3.csv("./data/UScolleges.csv", d3.autoType).then((data) => {
  //data.filter((d) => d.cost === "null").remove();
  console.log(data);

  const newData = data
    .filter((d) => d.top_50 === "True" && d.cost !== null)
    .sort((a, b) => a.cost - b.cost);
  console.log(newData);
  /** CONSTANTS */
  // constants help us reference the same values throughout our code
  let margin = { top: 20, bottom: 100, left: 75, right: 40 },
    width = 400, // - margin.left - margin.right,
    height = 200 - margin.bottom, // - margin.bottom
    paddingInner = 0.2;

  /** SCALES */

  const xScale = d3
    .scaleBand()
    .domain(newData.map((d) => d.institution_name))
    .range([margin.left, width - margin.right])
    .paddingInner(paddingInner);
  // console.log(xScale.domain());

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(newData, (d) => d.cost)])
    .range([height, margin.top]);
  // console.log(yScale.domain());

  /** AXIS */
  // x Axis
  const xAxis = d3.axisBottom(xScale).tickValues([]);

  // y Axis
  const yAxis = d3.axisLeft(yScale).tickFormat(d3.format(".2s"));

  /** MAIN CODE */
  const svg = d3
    .select("#barchart-container")
    .append("svg")
    .attr("viewBox", "0 0 400 200")
    .attr("transform", "translate(0,0)");

  svg
    .append("g")
    .attr("class", "axis")
    // .attr("transform", `translate(0, ${height - margin.bottom})`)
    .attr("transform", `translate(0,${height})`)
    .call(xAxis)
    .append("text")
    .attr("class", "axis-label")
    .attr("x", "60%")
    .attr("y", "20")
    .text("Institution Name");
  svg
    .append("g")
    .attr("class", "y axis")
    .attr("transform", `translate(${margin.left},0)`)
    .call(yAxis)
    .append("text")
    .attr("class", "axis-label")
    .attr("y", "30%") //in the middle of line
    .attr("dx", "-4em")
    .attr("writing-mode", "vertical-rl")
    .text("Cost, $");

  const tip = d3
    .tip()
    .attr("class", "d3-tip")
    .html((d) => {
      let text = `<strong>Location: </strong><span 
        style='color':'black'>${d.state}</span><br>`;
      text += `
        <strong>Institution Name: </strong><span>${d.institution_name}</span><br>`;

      text += `
        <strong>Cost: </strong><span>${d.cost}</span><br>
        `;
      text += `
        <strong>Meadian Family Income: </strong><span>${d.family_income_median}</span><br>
        `;
      return text;
    });
  svg.call(tip);

  // append rects
  const rect = svg
    .selectAll("rect")
    .attr("class", "bars")
    //.sort((a, b) => a - b)
    .data(newData)
    .join("rect")
    .attr("y", (d) => yScale(d.cost))
    .attr("x", (d) => xScale(d.institution_name))
    .attr("width", xScale.bandwidth())
    .attr("height", (d) => height - yScale(d.cost))
    // .attr("height", (d, i) => height - yScale(i))
    .attr("fill", "steelblue")
    .on("mouseover", (event, d) => {
      d3.select(event.target).style("filter", "brightness(50%)");
    })
    .on("mouseover", tip.show)
    .on("mouseout", tip.hide);
});
