d3.csv("./data/majors.csv", d3.autoType).then((data) => {
  console.log(data);
  data = data
    .sort((a, b) => b.mean_score - a.mean_score)
    .filter((d) => d.mean_score > 0.004);

  const margin = { top: 20, bottom: 10, left: 60, right: 10 },
    width = 300, // - margin.left - margin.right,
    height = 280; //- margin.bottom;
  paddingInner = 0.2;
  // console.log(d3.values(newData[0]).filter((s) => s.includes("major")));

  // /** SCALES */

  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.mean_score)])
    .range([0, width - margin.right]); //([height, 0]);
  console.log(xScale.domain());

  const yScale = d3
    .scaleBand()
    .domain(data.map((d) => d.majors))
    .range([margin.top, height - margin.bottom])
    .paddingInner(paddingInner);
  console.log(yScale.domain());

  /** AXIS */
  // x Axis
  const xAxis = d3.axisBottom(xScale).tickValues([]);

  // y Axis
  const yAxis = d3.axisLeft(yScale);

  /** MAIN CODE */
  const svg = d3
    .select("#barchart-container")
    .append("svg")
    .attr("viewBox", "0 0 600 280")
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
  const formatPer = d3.format(".1%");
  //TOOLTIP;
  const tip_bar = d3
    .tip()
    .attr("class", "d3-tip")
    .html((d) => {
      let text = `
        Average percentage of degrees awarded in<br><span
        style='color':'black'> <strong>${toTitleCase(
          formatMajors(d.majors)
        )}</span> </strong><span>is ${formatPer(d.mean_score)}</span><br>`;

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
    .attr("x", margin.left + 100) //+ width / 3) //(d) => xScale(d.total))
    .attr("height", yScale.bandwidth())
    .attr("width", (d) => xScale(d.mean_score)) //width - xScale(d.mean_score))
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
    .attr("class", "majors_label")
    .attr("text-anchor", "end")
    // this allows us to position the text in the center of the bar
    .attr("y", (d) => yScale(d.majors) + 15)
    .text((d) => toTitleCase(formatMajors(d.majors)))
    .attr("x", (d) => margin.left + width / 3 - 10);
  // .attr("dy", "1.8em"); // margin.left + width / 3 - 10);
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
