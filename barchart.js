// data load
// reference for d3.autotype: https://github.com/d3/d3-dsv#autoType
d3.csv("./data/UScolleges.csv", d3.autoType).then((data) => {
  console.log(data);

  const newData = data
    .filter((d) => d.median_earnings >= 80000) // && d.cost !== null)
    .sort((a, b) => b.median_earnings - a.median_earnings);
  // console.log(newData);

  /** CONSTANTS */
  // constants help us reference the same values throughout our code
  let margin = { top: 20, bottom: 100, left: 75, right: 40 },
    width = 400, // - margin.left - margin.right,
    height = 200 - margin.bottom, // - margin.bottom
    paddingInner = 0.2;

  /** SCALES */

  const data_majors = [
    ...Array.from(new Set(newData.map((d) => d.agriculture_major_perc))),
  ];
  //       ,
  //         d.architecture_major_perc,
  //         d.bio_science_major_perc,
  //         d.business_marketing_major_perc,
  //         d.comm_tech_major_perc,
  //         d.communications_major_perc,
  //         d.computer_science_major_perc,
  //         d.construction_major_perc,
  //         d.consumer_science_major_perc,
  //         d.culinary_major_perc,
  //         d.cultural_major_perc,
  //         d.education_major_perc,
  //         d.eng_tech_major_perc,
  //         d.engineering_major_perc,
  //         d.english_major_perc,
  //         d.health_medical_major_perc,
  //         d.history_major_perc,
  //         d.interdiscipline_major_perc,
  //         d.language_major_perc,
  //         d.law_major_perc,
  //         d.liberal_arts_major_perc,
  //         d.library_science_major_perc,
  //         d.math_stats_major_perc,
  //         d.mechanics_major_perc,
  //         d.military_major_perc,
  //         d.parks_rec_major_perc,
  //         d.philo_relig_major_perc,
  //         d.phys_science_major_perc,
  //         d.precision_production_major_perc,
  //         d.protective_services_major_perc,
  //         d.psych_major_perc,
  //         d.public_admin_major_perc,
  //         d.resources_major_perc,
  //         d.science_technician_major_perc,
  //         d.social_science_major_perc,
  //         d.theology_major_perc,
  //         d.transportation_major_perc,
  //         d.vis_performing_arts_major_perc
  //       )
  //     )
  //   ),
  // ];
  console.log(data_majors);
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
  // console.log(yScale.domain());

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
    .text("Institution Name");
  svg
    .append("g")
    .attr("class", "y axis")
    .attr("transform", `translate(${margin.left},0)`)
    .call(yAxis)
    .append("text")
    .attr("class", "axis-label")
    .attr("y", "30%")
    .attr("dx", "-4em")
    .attr("writing-mode", "vertical-rl")
    .text("Cost, $");

  // TOOLTIP
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
        <strong>Median Earnings: </strong><span>${d.median_earnings}</span><br>
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
