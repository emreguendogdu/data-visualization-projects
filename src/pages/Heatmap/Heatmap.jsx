/* eslint-disable no-undef */
import "./Heatmap.css";
import { useEffect } from "react";

export default function Heatmap() {
  useEffect(() => {
    const section = d3.select("#heatmap");

    const DATA_URL =
      "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";

    const colorsDomain = [2.8, 3.9, 5, 6.1, 7.2, 8.3, 9.4, 10.5, 11.6, 12.9];

    const colorList = d3.schemeRdYlBu[10].reverse();

    const description = document.querySelector("#description");

    const color = d3.scaleThreshold().domain(colorsDomain).range(colorList);
    const margin = { top: 16, right: 9 * 16, bottom: 8 * 16, left: 9 * 16 },
      height = 33 * 12;

    const svg = section
      .append("svg")
      .attr("width", "100%")
      .attr("height", height + margin.top + margin.bottom);

    const tooltip = d3.select("body").append("div").attr("id", "tooltip");

    function drawGraph(data) {
      data.monthlyVariance.forEach((d) => (d.month -= 1));

      const width = 4 * Math.ceil(data.monthlyVariance.length / 12);
      const xScale = d3
        .scaleBand()
        .domain(data.monthlyVariance.map((d) => d.year))
        .range([0, width]);

      const yScale = d3
        .scaleBand()
        .domain(d3.range(0, 12, 1))
        .range([0, height]);

      const yAxis = d3
        .axisLeft()
        .scale(yScale)
        .tickValues(yScale.domain())
        .tickFormat((month) => {
          const date = new Date(0);
          date.setUTCMonth(month);
          const monthFormat = d3.utcFormat("%B");
          return monthFormat(date);
        })
        .tickSize(10, 1);

      const xAxis = d3
        .axisBottom()
        .scale(xScale)
        .tickValues(xScale.domain().filter((year) => year % 10 === 0)) // 1780-1790-1800 etc.
        .tickFormat((year) => {
          const date = new Date(0);
          date.setUTCFullYear(year);
          const yearFormat = d3.utcFormat("%Y");
          return yearFormat(date);
        })
        .tickSize(10, 1);

      svg
        .append("g")
        .attr("id", "y-axis")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .style("text-anchor", "end")
        .call(yAxis);

      svg
        .append("g")
        .attr("id", "x-axis")
        .attr("transform", `translate(${margin.left}, ${height + margin.top})`)
        .style("text-anchor", "middle")
        .call(xAxis);

      const map = svg
        .append("g")
        .attr("class", "map")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .selectAll("rect")
        .data(data.monthlyVariance)
        .enter();

      map
        .append("rect")
        .attr("class", "cell")
        .attr("data-month", (d) => d.month)
        .attr("data-year", (d) => d.year)
        .attr("data-temp", (d) => data.baseTemperature + d.variance)
        .attr("x", (d) => xScale(d.year))
        .attr("y", (d) => yScale(d.month))
        .attr("width", (d) => xScale.bandwidth(d.year))
        .attr("height", (d) => yScale.bandwidth(d.month))
        .attr("fill", (d) => color(data.baseTemperature + d.variance))
        .on("mouseover", (e) => {
          const dataObject = e.target["__data__"];

          tooltip
            .style("opacity", 0.9)
            .style("transform", "translateX(16px)")
            .attr("data-year", dataObject.year);

          const date = new Date(dataObject.year, dataObject.month);

          tooltip
            .html(
              `<span class="date">${d3.utcFormat("%Y - %B")(
                date
              )}</span><br><span class="temperature">${d3.format(".1f")(
                data.baseTemperature + dataObject.variance
              )}&#8451;</span><br><span class="variance">${d3.format(".1f")(
                dataObject.variance
              )}&#8451;</span>`
            )
            .style("left", `${e.pageX}px`)
            .style("top", `${e.pageY - 28}px`);
        })
        .on("mouseout", () => tooltip.style("opacity", 0));

      const LEGEND_WIDTH = 400,
        LEGEND_HEIGHT = 40;

      const legend = svg
        .append("g")
        .attr("id", "legend")
        .attr(
          "transform",
          `translate(${width - margin.right - margin.left}, ${
            margin.top * 3 + height + margin.bottom - 2 * LEGEND_HEIGHT
          })`
        );

      const legendX = d3
        .scaleLinear()
        .domain([d3.min(colorsDomain), d3.max(colorsDomain)])
        .range([0, LEGEND_WIDTH]);

      const legendXAxis = d3
        .axisBottom()
        .scale(legendX)
        .tickSize(28)
        .tickValues(colorsDomain)
        .tickFormat(d3.format(".1f"));

      legend
        .append("g")
        .selectAll("rect")
        .data(colorsDomain.slice(0, -1))
        .enter()
        .append("rect")
        .attr("x", (d) => legendX(d))
        .attr("fill", (d) => color(d))
        .attr("width", 52)
        .attr("height", 27.27);

      legend.append("g").call(legendXAxis);
    }

    d3.json(DATA_URL)
      .then((data) => {
        description.innerHTML = `${data.monthlyVariance[0].year} - ${
          data.monthlyVariance[data.monthlyVariance.length - 1].year
        }: base temperature ${data.baseTemperature} &#8451;`;
        drawGraph(data);
      })
      .catch((err) => console.log(`Error, ${err}`));
  });
  return (
    <>
      <section id="heatmap">
        <header>
          <h1 id="title">Monthly Global Land-Surface Temperature</h1>
          <h3 id="description"></h3>
        </header>
      </section>
    </>
  );
}
