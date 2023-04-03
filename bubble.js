// CONST and GLOBALS

let margin = { top: 20, bottom: 20, left: 75, right: 40 },
  width = 400, // - margin.left - margin.right,
  height = 300 - margin.bottom, // - margin.bottom
  paddingInner = 0.2;

/** these variables allow us to access anything we manipulate in
 * init() but need access to in draw().
 * All these variables are empty before we assign something to them.*/
let svg_bubble;
let xScale_bubble;
let yScale_bubble;

// Aplication state
let state = {
  data: [],
  selectedState: "All",
};

// Load data

d3.csv("../data/UScolleges.csv", d3.autoType).then((raw_data) => {
  console.log("raw_data", raw_data);
  state.data = raw_data;
  init();
});

//INITIALIZING FUNCTION
// this will be run one time when data finishes loading in

function init() {
  // SCALES
  xScale_bubble = d3
    .scaleLinear()
    .domain(d3.extent(state.data, (d) => d.median_debt))
    .range([margin.left, width - margin.right]);

  yScale_bubble = d3
    .scaleLinear()
    .domain(d3.extent(state.data, (d) => d.median_earnings))
    .range([height - margin.bottom, margin.top]);
  console.log(xScale_bubble.domain(), yScale_bubble.domain());
  // AXES

  const xAxis = d3.axisBottom(xScale_bubble).tickFormat(d3.format(".2s"));
  const yAxis = d3.axisLeft(yScale_bubble).tickFormat(d3.format(".2s"));

  // UI element set up
  // add dropdown (HTML selection) for interaction
  // HTML select reference https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
  const selectElement = d3.select("#dropdown").on("change", function () {
    console.log("new selected state type is", this.value);
    //'this' === the selectElement
    // this.value holds the dropdown value a user just selected
    state.selectedState = this.value;
    draw(); //re-draw the graph based on this new selection
  });
  // add in dropdown options from the unique values in the data
  selectElement
    .selectAll("option")

    .data([
      "Alabama",
      "Alaska",
      "Arizona",
      "Arkansas",
      "California",
      "Colorado",
      "Connecticut",
      "Delaware",
      "Florida",
      "Georgia",
      "Hawaii",
      "Idaho",
      "Illinois",
      "Indiana",
      "Iowa",
      "Kansas",
      "Kentucky",
      "Louisiana",
      "Maine",
      "Maryland",
      "Massachusetts",
      "Michigan",
      "Minnesota",
      "Mississippi",
      "Missouri",
      "Montana",
      "Nebraska",
      "Nevada",
      "New Hampshire",
      "New Jersey",
      "New Mexico",
      "New York",
      "North Carolina",
      "North Dakota",
      "Ohio",
      "Oklahoma",
      "Oregon",
      "Pennsylvania",
      "Rhode Island",
      "South Carolina",
      "South Dakota",
      "Tennessee",
      "Texas",
      "Utah",
      "Vermont",
      "Virginia",
      "Washington",
      "West Virginia",
      "Wisconsin",
      "Wyoming",
      "District of Columbia",
      "American Samoa",
      "Guam",
      "Northern Mariana Islands",
      "Puerto Rico",
      "United States Minor Outlying Islands",
      "U.S. Virgin Islands",
    ]) // unique data values-- (hint: to do this programmatically take a look `Sets`)
    .join("option")
    .attr("value", (d) => d)
    .text((d) => d);

  // create an svg element in our main `d3-container` element
  svg_bubble = d3
    .select("#bubble-container")
    .append("svg")
    .attr("viewBox", "0 0 400 300")
    .attr("transform", "translate(0,0)");

  // add the xAxis
  svg_bubble
    .append("g")
    .attr("class", "axis x-axis")
    .attr("transform", `translate(0,${height})`)
    .call(xAxis)
    .append("text")
    .attr("class", "axis-label")
    .attr("x", "50%")
    .attr("dy", "3em")
    .text("Median Debt");

  // add the yAxis
  svg_bubble
    .append("g")
    .attr("class", "axis y-axis")
    .attr("transform", `translate(${margin.left},0)`)
    .call(yAxis)
    .append("text")
    .attr("class", "axis-label")
    .attr("y", "50%") //in the middle of line
    .attr("dx", "-4em")
    .attr("writing-mode", "vertical-rl")
    .text("Median Earnings");

  draw();
  // calls the draw function
}

/**
 * DRAW FUNCTION
 * we call this everytime there is an update to the data/state
 * */
function draw() {
  // filter the data for the selectedParty
  let filteredData = state.data;
  // if there is a selectedType, filter the data before mapping it to our elements
  if (state.selectedState !== "All") {
    filteredData = state.data.filter((d) => d.state === state.selectedState);
  }

  const dot = svg_bubble
    .selectAll(".dot")

    .data(filteredData, (d) => d.institution_name)
    .join(
      (enter) =>
        // enter selections -- all data elements that don't have a `.dot` element attached to them yet
        enter
          .append("circle")
          .attr("class", "dot") // Note: this is important so we can identify it in future updates
          .attr("stroke", "grey")
          .attr("opacity", 0.8)
          .attr("fill", "black")
          .attr("r", 5)
          .attr("cx", (d) => xScale_bubble(d.median_debt))
          .attr("cy", (d) => margin.bottom + 150)

          // initial value - to be transitioned
          .call((enter) =>
            enter
              .transition() // initialize transition
              //.delay(d => 50 * d.rating) // delay on each element
              .duration(1200) // duration 500ms
              .attr("cy", (d) => yScale_bubble(d.median_earnings))
          ),
      (update) =>
        update.call((update) =>
          // update selections -- all data elements that match with a `.dot` element
          update.transition().duration(250)
        ),
      (exit) =>
        exit.call((exit) =>
          //     // exit selections -- all the `.dot` element that no longer match to HTML elements
          exit
            .transition()
            .delay((d) => 10 * d.median_earnings)
            .duration(500)
            .attr("cy", height)
            .remove()
        )
    );
}
