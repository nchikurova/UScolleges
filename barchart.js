// data load
// reference for d3.autotype: https://github.com/d3/d3-dsv#autoType
d3.csv("./data/UScolleges.csv", d3.autoType).then((data) => {
  // console.log(data);

  const newData = data
    .filter((d) => d.median_earnings >= 80000) // && d.cost !== null)
    .sort((a, b) => b.median_earnings - a.median_earnings);
  console.log(newData);
  const majors = d3.keys(newData[0]).filter((s) => s.includes("major"));
  console.log(majors);
  /** CONSTANTS */
  // constants help us reference the same values throughout our code
  let margin = { top: 20, bottom: 100, left: 75, right: 40 },
    width = 400, // - margin.left - margin.right,
    height = 200 - margin.bottom, // - margin.bottom
    paddingInner = 0.2;
  // console.log(d3.values(newData[0]).filter((s) => s.includes("major")));

  let majors2 = [];

  // const result = newData.reduce((acc, curr) => {
  //   const matchingKeys = Object.keys(curr).filter((key) =>
  //     key.includes("_major_")
  //   );
  //   const data = [curr.institution_name];
  //   matchingKeys.forEach((key) => {
  //     data.push({ [key]: curr[key] });
  //   });
  //   acc.push(data);
  //   return acc;
  // }, []);

  const collegeDataObject = newData.reduce((acc, curr) => {
    const filteredKeys = Object.keys(curr).filter((key) =>
      key.includes("_major_")
    );
    const data = { id: curr.id };
    for (const key of filteredKeys) {
      console.log(filteredKeys);
      data[key] = curr[key];
    }
    acc.push(data);
    return acc;
  }, []);

  console.log(collegeDataObject);

  // const subgroups = result.forEach((arr) => {
  //     arr.forEach((college_name) => {

  //     })
  // })

  // // for (let i = 0; i < newData.length; i++) {
  //   if (
  //     d3
  //       .keys(newData[i])
  //       .filter((s) => s.includes("major") || s.includes("institution"))
  //   ) {
  //     majors2.push(d.keys(newData[i]));
  //   }
  // }
  // newData.forEach((d, i) => {
  //   const setOfKeys = d3.keys(newData[i]);
  //   if (setOfKeys) {
  //     setOfKeys.filter(
  //       (s) => s.includes("major") || s.includes("institution")
  //     );
  //   }
  //   majors2.push(d3.keys(newData[i]));
  // });
  // console.log(majors2);

  // const groupByCollege = d3
  //   .nest()
  //   .key((d) => d.median_earnings)
  //   // .rollup(newData, (d) => d.filter((s) => s.includes("major")))
  //   .entries(newData);
  // console.log(groupByCollege);
  // console.log(d3.values(groupByCollege[3]));

  // let majors = [];

  // groupByCollege.forEach((d) => {
  //   let major = d.values[0].majors;
  //   if (major !== "") {
  //     majors.push(major);
  //   }
  // });
  // majors = majors.filter((d) => d !== "");
  // console.log(newData.values[0]);
  // console.log(majors);
  // Once we have extracted and filtered the majors data, we can then map each major to its corresponding median earnings value and create a new array of objects with 'major' and 'median earnings' keys.
  // We can then use this new array to visualize the data using d3.js.
  // let majorEarnings = [];

  // newData.forEach((d) => {
  //   console.log(d.values[0].majors);
  //   let major = d.values[0].majors;
  //   let earnings = d.values[0].median_earnings;
  //   if (major !== "" && earnings !== null) {
  //     majorEarnings.push({
  //       major: major,
  //       medianEarnings: parseInt(earnings), // convert earnings to integer
  //     });
  //   }
  // });
  // console.log(majorEarnings);

  /** SCALES */
  const xScale = d3
    .scaleBand()
    .domain(newData.map((d) => d.institution_name))
    .range([margin.left, width - margin.right])
    .paddingInner(paddingInner);
  console.log(xScale.domain());

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(newData, (d) => d.median_earnings)])
    .range([height, margin.top]);
  console.log(yScale.domain());
  // const colorScaleBar = d3
  //   .scaleOrdinal()
  //   .domain([0, 250000])
  //   .range([
  //     "#98abc5",
  //     "#8a89a6",
  //     "#7b6888",
  //     "#6b486b",
  //     "#a05d56",
  //     "#d0743c",
  //     "#ff8c00",
  //   ]);

  /** AXIS */
  // x Axis
  const xAxis = d3.axisBottom(xScale).tickValues([]);

  // y Axis
  const yAxis = d3
    .axisLeft(yScale)
    // .tickFormat(d3.format(".2s"))
    .ticks(6, ".2s");

  /** MAIN CODE */
  const svg = d3
    .select("#barchart-container")
    .append("svg")
    .attr("viewBox", "0 0 400 200")
    .attr("transform", "translate(0,0)");

  svg
    .append("g")
    .attr("class", "axis")
    .attr("transform", `translate(0,${height})`)
    .call(xAxis)
    .append("text")
    .attr("class", "axis-label")
    .attr("x", "60%")
    .attr("y", "20")
    .text("Institution");
  svg
    .append("g")
    .attr("class", "y axis")
    .attr("transform", `translate(${margin.left},0)`)
    .call(yAxis)
    .append("text")
    .attr("class", "axis-label")
    .attr("y", "30%")
    .attr("dx", "-5em")
    .attr("writing-mode", "vertical-rl")
    .text("Median Earnings, $");

  // TOOLTIP

  const formatNumbers = d3.format(",.2f");
  const tip = d3
    .tip()
    .attr("class", "d3-tip")
    .html((d) => {
      let text = `<strong>Location: </strong><span
        style='color':'black'>${d.state}</span><br>`;
      text += `
        <strong>Institution Name: </strong><span>${d.institution_name}</span><br>`;

      text += `
        <strong>Cost: </strong><span>${d.eng_tech_major_perc}</span><br>
        `;
      text += `
        <strong>Median Earnings: </strong><span>$${formatNumbers(
          d.median_earnings
        )}</span><br>
        `;
      text += `
     <strong>Major: </strong><span>${d.architecture_major_perc},${d.bio_science_major_perc},${d.business_marketing_major_perc},

      }</span><br>
        `;
      return text;
    });
  svg.call(tip);

  // append rects
  const rect = svg
    .selectAll("rect")
    .attr("class", "bars")
    .data(newData)
    .join("rect")
    .attr("y", (d) => yScale(d.median_earnings))
    .attr("x", (d) => xScale(d.institution_name))

    .attr("width", xScale.bandwidth())
    .attr("height", (d) => height - yScale(d.median_earnings))
    .attr("fill", "rgb(45, 114, 130)")
    .on("mouseover", tip.show)
    .on("mouseout", tip.hide);
});
// adding button 'Read more' source:
// https://www.w3schools.com/howto/howto_js_read_more.asp
function readMore() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("myBtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "See the list of colleges";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Read less";
    moreText.style.display = "inline";
  }
}
