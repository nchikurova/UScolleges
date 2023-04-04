let margin_map = { top: 20, bottom: 100, left: 75, right: 40 },
  width_map = 400, // - margin.left - margin.right,
  height_map = 300 - margin.bottom; // - margin.bottom

let svg_map;

let state1 = {
  geojson: null,
  colleges: null,
  hover: {
    latitude: null,
    longitude: null,
    state: null,
  },
};

Promise.all([
  d3.json("./data/usState.json"),
  d3.csv("./data/UScolleges.csv", d3.autotype),
]).then(([geojson, colleges]) => {
  state1.geojson = geojson;
  state1.colleges = colleges;

  console.log("state: ", state1);

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
    .attr("viewBox", "0 0 400 220")
    .append("g")
    .attr("transform", "translate(0,0)");

  console.log(state1.colleges[0].cost);
  const aveCost = new Array(state1.colleges.map((d) => d.cost));
  console.log(aveCost);

  //   console.log(state1.colleges.length);
  //   console.log(state1.colleges.state);
  //   const aveByState = state1.colleges.group(({ state }) => state);
  //   console.log(aveByState);

  const costByState = d3
    .nest()
    .key((d) => d.state)
    .rollup((v) => d3.mean(v, (d) => d.cost))
    .entries(state1.colleges);

  console.log(costByState);
  //   const findAveByState = () => {
  //     for (let i = 0; i < state1.colleges.length; i++) {
  //       console.log(state1.colleges[i].state);
  //       let costArray = [];
  //       const sameState = state1.colleges[i].state;
  //       let costByState = state1.colleges[i].cost;
  //       if (sameState === sameState) {
  //         costByState++;
  //       } else {
  //         costByState;
  //       }
  //       return costArray;
  //     }
  //   };
  //   console.log(findAveByState);
  //   console.log();
  //       const AveCostPerState = state.colleges.reduce((acc, cur) => {

  //         acc + cur.cost
  //         if (state1.colleges)
  //       }, [])
  //   const aveCostByState = new Map(costByState.map((d) => [d.state, +d.cost]));
  //   console.log(aveCostByState);

  const colorScale = d3.scaleQuantile([0, 39705], d3.schemeBlues[9]);

  console.log(colorScale.domain());

  svg_map
    .selectAll(".state")
    // all of the features of the geojson, meaning all the states as individuals
    .data(state1.geojson.features)
    .join("path")
    .attr("d", path)
    .attr("class", "state")
    .attr("fill", (d) => {
      // console.log("d", d, d.properties.NAME);
      let value = costByState.get(d.properties.NAME);
      return value != 0 ? colorScale(value) : "grey";
    })
    .attr("stroke", "black")
    .on("mouseover", (d) => {
      // when the mouse rolls over this feature, do this
      state1.hover["state"] = d.properties.NAME;
      draw_map(); // re-call the draw function when we set a new hoveredState
    });

  // EXAMPLE 1: going from Lat-Long => x, y
  // for how to position a dot
  //   const GradCenterCoord = { latitude: 40.7423, longitude: -73.9833 };
  //   svg_map
  //     .selectAll("circle")
  //     .data([GradCenterCoord])
  //     .join("circle")
  //     .attr("r", 10)
  //     .attr("fill", "steelblue")
  //     .attr("transform", (d) => {
  //       const [x, y] = projection([d.longitude, d.latitude]);
  //       return `translate(${x}, ${y})`;
  //     });

  //   EXAMPLE 2: going from x, y => lat-long
  //   this triggers any movement at all while on the svg
  svg_map.on("mousemove", () => {
    // we can use d3.mouse() to tell us the exact x and y positions of our cursor
    const [mx, my] = d3.mouse(svg_map.node());
    // projection can be inverted to return [lat, long] from [x, y] in pixels
    const proj = projection.invert([mx, my]);
    state1.hover["longitude"] = proj[0];
    state1.hover["latitude"] = proj[1];
    draw_map();
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
