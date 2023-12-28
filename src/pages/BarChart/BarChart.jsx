/* eslint-disable no-undef */
import { useEffect } from "react"
import "./BarChart.css"

export default function BarChart() {
  useEffect(() => {
    const jsonUrl =
      "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"

    const margin = { top: 25, right: 0, bottom: 25, left: 50 },
      width = 800,
      height = 400

    const tooltip = d3
      .select("body")
      .append("div")
      .attr("id", "tooltip")
      .attr(
        "style",
        "position: absolute; padding: 4px; background: lightgray; border: 1px solid black; color: black; opacity: 0; pointer-events: none"
      )

    function DrawBar(dataset) {
      // d[0] means Date, d[1] means GDP Value

      let minDate = d3.min(dataset, (d) => new Date(d[0]))
      let maxDate = d3.max(dataset, (d) => new Date(d[0]))
      const xScale = d3.scaleTime().domain([minDate, maxDate]).range([0, width])

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(dataset, (d) => d[1])])
        .range([height, 0])

      const xAxis = d3.axisBottom(xScale)
      const yAxis = d3.axisLeft(yScale)

      const svg = d3
        .select("#graph-container")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("class", "graph-svg-component")

      svg
        .append("g")
        .attr("id", "x-axis")
        .attr("transform", `translate(${margin.left}, ${height + margin.top})`)
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")

      svg
        .append("g")
        .attr("id", "y-axis")
        .attr("transform", `translate(${margin.left}, ${margin.top})`)
        .call(yAxis)

      const barWidth = width / dataset.length
      const dateFormat = d3.timeFormat("%Y-%m-%d")

      svg
        .selectAll("bar")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("data-date", (d) => dateFormat(new Date(d[0])))
        .attr("data-gdp", (d) => d[1])
        .attr("x", (d) => xScale(new Date(d[0])))
        .attr("y", (d) => yScale(d[1]))
        .attr("width", barWidth)
        .attr("transform", `translate(${margin.left}, ${margin.bottom})`)
        .attr("height", (d) => height - yScale(d[1]))

      svg
        .selectAll("rect")
        .on("mouseover", (d) => {
          tooltip
            .transition()
            .duration(200)
            .style("opacity", 0.9)
            .style("transform", "translateX(15px)")

          const date = d.target.attributes["data-date"].value.split("-")
          let quarter

          if (date[1] >= 9) {
            quarter = 4
          } else if (date[1] >= 6) {
            quarter = 3
          } else if (date[1] >= 3) {
            quarter = 2
          } else {
            quarter = 1
          }

          tooltip
            .html(
              `
            <p><b>${date[0]} Q${quarter}</b></p>
            <p>$${d.target.attributes["data-gdp"].value} billion</p>`
            )
            .style("left", `${d.pageX}px`)
            .style("top", `${d.pageY - 28}px`)
            .attr("data-date", d.target.attributes["data-date"].value)
        })

        .on("mouseout", () => {
          tooltip.transition().style("opacity", 0)
        })
    }

    d3.json(jsonUrl)
      .then((json) => {
        const dataset = json.data
        DrawBar(dataset)
      })
      .catch((err) => console.log("Error: ", err))
  })
  return (
    <>
      <section id="barchart">
        <div id="card-container">
          <h1 id="title">
            United States GDP{" "}
            <a
              href="https://en.wikipedia.org/wiki/Gross_domestic_product"
              target="_blank"
              rel="noreferrer"
            >
              (Gross Domestic Product)
            </a>
          </h1>
          <div id="graph-container"></div>
        </div>
      </section>
    </>
  )
}
