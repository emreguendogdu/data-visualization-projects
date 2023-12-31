import { useEffect } from "react"
import Navbar from "../../components/Navbar/Navbar"
import * as d3 from "d3"
import "./ScatterPlot.css"

const dataset =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json"

const margin = { top: 50, right: 20, bottom: 30, left: 60 },
  width = 920 - margin.left - margin.right,
  height = 630 - margin.top - margin.bottom

const xScale = d3.scaleLinear().range([0, width])
const yScale = d3.scaleTime().range([0, height])

const color = d3.scaleOrdinal(d3.schemeCategory10)

const timeFormat = d3.timeFormat("%M:%S")

const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"))
const yAxis = d3.axisLeft(yScale).tickFormat(timeFormat)

export default function ScatterPlot() {
  useEffect(() => {
    const section = d3.select("#scatterplot")

    const svg = section
      .append("svg")
      .attr("width", `${width + margin.left + margin.right}`)
      .attr("height", `${height + margin.top + margin.bottom}`)
      .attr("class", "graph")
      .attr("id", "scatterplot")
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    svg
      .append("text")
      .attr("id", "title")
      .text("Doping in Professional Bicycle Racing")
      .attr("x", 200)
    svg
      .append("text")
      .attr("id", "description")
      .text("35 Fastest times up Alpe d'Huez")
      
      .attr("x", 300)
      .attr("y", 30)

    const tooltip = section
      .append("div")
      .attr("id", "tooltip")
      .attr(
        "style",
        "position: absolute; padding: 4px; background: lightgray; border: 1px solid black; opacity: 0; pointer-events: none;"
      )

    function DrawGraph(data) {
      data.forEach((d) => {
        d.Place = +d.Place
        const parsedTime = d.Time.split(":")
        d.Time = new Date(1970, 0, 1, 0, parsedTime[0], parsedTime[1])
      })

      xScale.domain([
        d3.min(data, (d) => d.Year - 1),
        d3.max(data, (d) => d.Year + 1),
      ])
      yScale.domain(d3.extent(data, (d) => d.Time))

      svg
        .append("g")
        .attr("id", "x-axis")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis)
        .append("text")
        .attr("class", "x-axis-label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text("Year")

      svg
        .append("g")
        .attr("id", "y-axis")
        .call(yAxis)
        .append("text")
        .style("color", "black")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Best Time (minutes)")

 

      const barWidth = width / data.length

      svg
        .selectAll(".dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("r", 6)
        .attr("cx", (d) => xScale(d.Year))
        .attr("cy", (d) => yScale(d.Time))
        .attr("data-xvalue", (d) => d.Year)
        .attr("data-yvalue", (d) => d.Time.toISOString())
        .style("fill", (d) => color(d.Doping !== ""))
        .on("mouseover", (e) => {
          const eData = e.target["__data__"]
          tooltip
            .transition()
            .duration(200)
            .style("opacity", 0.9)
            .style("color", "black")
            .attr("data-year", e.target.attributes["data-xvalue"].value)

          tooltip
            .html(
              `
        <span class="bold">${eData.Name}</span>, ${
                eData.Nationality
              }<br>Year: <span class="bold">${
                eData.Year
              }</span>, Time: <span class="bold">${timeFormat(
                eData.Time
              )}</span> ${eData.Doping ? "<br>" + eData.Doping : ""}
      `
            )
            .style("left", `${e.pageX}px`)
            .style("top", `${e.pageY - 28}px`)
        })
        .on("mouseout", () => tooltip.style("opacity", 0))

      const legendContainer = svg.append("g").attr("id", "legend")

      const legend = legendContainer
        .selectAll("#legend")
        .data(color.domain())
        .enter()
        .append("g")
        .attr("class", "legend-label")
        .attr("transform", (d, i) => `translate(0, ${height / 2 - i * 20})`)

      legend
        .append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color)

      legend
        .append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .text((d) =>
          d ? "Riders with doping allegations" : "Riders with no doping allegations"
        )
    }

    d3.json(dataset)
      .then((data) => {
        DrawGraph(data)
      })
      .catch((err) => console.log("Error: " + err))
  })

  return (
    <>
      <Navbar />
      <section id="scatterplot">
        <header></header>
      </section>
    </>
  )
}
