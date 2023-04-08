let margin_map = { top: 20, bottom: 100, left: 75, right: 40 },
  width_map = 360, // - margin.left - margin.right,
  height_map = 300 - margin.bottom; // - margin.bottom

let svg_map;
let tip_map;

let state1 = {
  geojson: null,
  colleges: null,
  aveCost: null,
  hover: {
    state: null,
    cost: null,
  },
};

Promise.all([
  d3.json("./data/usState.json"),
  d3.csv("./data/UScolleges.csv", d3.autotype),
]).then(([geojson, colleges]) => {
  state1.geojson = geojson;
  state1.colleges = colleges;

  //   console.log("state: ", state1);

  init_map();
});

function init_map() {
  const projection = d3
    .geoAlbersUsa()
    .fitSize([width_map, height_map], state1.geojson);
  const path = d3.geoPath().projection(projection);

  svg_map = d3
    .select("#map-container")
    .append("svg")
    .attr("viewBox", "0 0 400 320")
    .append("g")
    .attr("transform", "translate(0,0)");

  //   console.log(state1.colleges[0].cost);
  //   console.log(state1.colleges.length);
  //   console.log(state1.colleges.state);
  const costByState = d3
    .nest()
    .key((d) => d.state)
    .rollup((v) => d3.median(v, (d) => d.cost))
    .entries(state1.colleges);

  //   console.log(costByState);

  aveCost = new Map(costByState.map((d) => [d.key, d.value]));
  //   console.log(aveCost);

  //   const colorScale = d3
  //     .scaleQuantile([217, 15031]).
  //     .range(["#aae2e2", "#2D7282"]);

  const colorScale = d3
    .scaleLinear()
    .domain([217, 15031])
    .range(["white", "#5b407a"]);
  //   console.log(colorScale.domain());
  const formatNumbersMap = d3.format(",.2f");
  // LEGENDS
  const keys = ["8k", "9k", "10k", "12k", "14k", "16k", "18k"];
  const legendColor = d3
    .scaleOrdinal()
    .domain(keys)
    .range([
      "#a697b7",
      "#9e8eb0",
      "#9584a9",
      "#7d6795",
      "#5e437c",
      "#533673",
      "#321159",
    ]);
  svg_map
    .selectAll("myrect")
    .data(keys)
    .enter()
    .append("rect")
    .attr("width", 30)
    .attr("height", 10)
    .attr("y", 280)
    .attr("x", (d, i) => 140 + i * 30)
    .style("fill", (d) => legendColor(d))
    .attr("stroke", "black")
    .attr("stroke-width", "1px")
    .attr("stroke-opacity", 1);

  svg_map
    .selectAll("mylabels")
    .data(keys)
    .enter()
    .append("text")
    .style("font-size", 12)
    .attr("y", 300)
    .attr("x", (d, i) => 150 + i * 30)
    .style("fill", "black")
    .text((d) => d)
    .style("text-anchor", "center")
    .style("alignment-baseline", "middle");

  svg_map
    .selectAll(".state")
    // all of the features of the geojson, meaning all the states as individuals
    .data(state1.geojson.features)
    .join("path")
    .attr("d", path)
    .attr("class", "state")
    .attr("fill", (d) => {
      //   console.log("d", d, d.properties.NAME);
      let value = aveCost.get(d.properties.NAME);
      return value != 0 ? colorScale(value) : "grey";
    })
    .attr("stroke", "black")

    .on("mouseover", (d) => {
      // when the mouse rolls over this feature, do this
      //   console.log(d);
      state1.hover["State"] = `<strong>${d.properties.NAME}</strong>`;
      state1.hover["Median Cost"] = `<strong>$${formatNumbersMap(
        aveCost.get(d.properties.NAME)
      )}</strong>`;
      draw_map(); // re-call the draw function when we set a new hoveredState
    });

  draw_map(); // calls the draw function
}

/**
 * DRAW FUNCTION
 * we call this everytime there is an update to the data/state
 * */
function draw_map() {
  // return an array of [key, value] pairs
  hoverData = Object.entries(state1.hover);
  //   console.log(aveCost);
  d3.select("#hover-content")
    .selectAll("div.row")
    .data(hoverData)
    .join("div")
    .attr("class", "row")
    .html(
      (d) =>
        // each d is [key, value] pair
        d[1] // check if value exist
          ? `${d[0]}: ${d[1]}` // if they do, fill them in
          : null // otherwise, show nothing
    );
}
