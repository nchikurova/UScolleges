// data load
// reference for d3.autotype: https://github.com/d3/d3-dsv#autoType
d3.csv("./data/top46majors.csv", d3.autoType).then((data) => {
  //   console.log(data);
  //   const majorsData = data1
  //     .filter((d) => d.median_earnings >= 80000) // && d.cost !== null)
  //     .sort((a, b) => b.median_earnings - a.median_earnings);
  /** CONSTANTS */
  // constants help us reference the same values throughout our code
  let margin_stack = { top: 20, bottom: 100, left: 75, right: 40 },
    width_stack = 300, // - margin.left - margin.right,
    height_stack = 100 - margin.bottom, // - margin.bottom
    paddingInner = 0.2;

  const subgroups = data.columns.slice(1);
  //   console.log(subgroups);

  // List of groups = species here = value of the first column called group -> I show them on the X axis
  const groups = d3.map(data, (d) => d.institution_name).keys();
  //   console.log(groups);

  /** SCALES */
  const xScale = d3
    .scaleBand()
    .domain(d3.map(data, (d) => d.institution_name).keys()) //(groups)
    .range([margin.left, width - margin.right])
    .paddingInner(paddingInner);
  //   console.log(xScale.domain());

  const yScale = d3.scaleLinear().domain([0, 1]).range([height, margin.top]);
  //   console.log(yScale.domain());
  const colorScaleBar = d3
    .scaleOrdinal()
    .domain(subgroups)
    .range([
      "#98abc5",
      "#8a89a6",
      "#7b6888",
      "#6b486b",
      "#a05d56",
      "#d0743c",
      "#ff8c00",
      "#e41a1c",
      "#377eb8",
      "#4daf4a",
      "#ff4000",
      "#ffbf00",
    ]);

  /** AXIS */
  // x Axis
  const xAxis = d3.axisBottom(xScale).tickValues([]);

  // y Axis
  const yAxis = d3.axisLeft(yScale);
  // .tickFormat(d3.format(".2s"))
  // .ticks(6, ".2s");

  /** MAIN CODE */
  const svg = d3
    .select("#stackedbar")
    .append("svg")
    .attr("viewBox", "0 0 460 300")
    .attr("transform", "translate(0,0)");

  svg
    .append("g")
    .attr("class", "axis")
    .attr("transform", `translate(0,${height})`)
    .call(xAxis);

  svg
    .append("g")
    .attr("class", "y axis")
    .attr("transform", `translate(${margin.left},0)`)
    .call(yAxis)
    .append("text")
    .attr("class", "axis-label")
    .attr("y", "40%")
    .attr("dx", "-3em")
    .attr("writing-mode", "vertical-rl")
    .text("Majors");

  const stackedData = d3.stack().keys(subgroups)(data);
  // TOOLTIP

  const formatNumbers = d3.format(",.2f");
  const tip = d3
    .tip()
    .attr("class", "d3-tip")
    .html((d) => {
      let text = `<strong>Location: </strong><span
          style='color':'black'>${d.state}</span><br>`;
      text += `
          <strong>Institution Name: </strong><span>${d.data.institution_name}</span><br>`;

      text += `
          <strong>Cost: </strong><span>${d.eng_tech_major_perc}</span><br>
          `;
      text += `
          <strong>Median Earnings: </strong><span>$${formatNumbers(
            d.median_earnings
          )}</span><br>
          `;
      text += `
       <strong>Major: </strong><span>${d.data.architecture_major_perc},${d.data.bio_science_major_perc},${d.business_marketing_major_perc},
  
        }</span><br>
          `;
      return text;
    });
  svg.call(tip);

  // append rects
  const rect = svg
    .append("g")
    // .selectAll("rect")
    .selectAll("g")
    // .attr("class", "bars")
    .data(stackedData)
    .enter()
    .append("g")
    .attr("class", "bars")
    .attr("fill", (d) => colorScaleBar(d.key))
    .selectAll("rect")
    // .join("rect")
    // enter a second time = loop subgroup per subgroup to add all rectangles
    .data((d) => d)
    .enter()
    .append("rect")
    .attr("y", (d) => yScale(d[1]))
    .attr("x", (d) => xScale(d.data.institution_name))

    .attr("width", xScale.bandwidth())
    .attr("height", (d) => yScale(d[0]) - yScale(d[1]))

    .on("mouseover", tip.show)
    .on("mouseout", tip.hide);
});
