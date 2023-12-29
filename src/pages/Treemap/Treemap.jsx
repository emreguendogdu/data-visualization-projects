/* eslint-disable no-undef */
import { useEffect, useState } from "react"
import Navbar from "../../components/Navbar/Navbar"
import "./Treemap.css"
import * as d3 from "d3"

const DATASETS = {
  videogames: {
    TITLE: "Video Game Sales",
    DESCRIPTION: "Top 100 Most Sold Video Games Grouped by Platform",
    FILE_PATH:
      "https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/video-game-sales-data.json",
  },
  movies: {
    TITLE: "Movie Sales",
    DESCRIPTION: "Top 100 Highest Grossing Movies Grouped By Genre",
    FILE_PATH:
      "https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/movie-data.json",
  },
  kickstarter: {
    TITLE: "Kickstarter Pledges",
    DESCRIPTION:
      "Top 100 Most Pledged Kickstarter Campaigns Grouped By Category",
    FILE_PATH:
      "https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/kickstarter-funding-data.json",
  },
}

const DEFAULT_DATASET = "videogames"

const Treemap = () => {
  const [datasetState, setDatasetState] = useState(DEFAULT_DATASET)

  useEffect(() => {
    const fetchData = async () => {
      const section = d3.select("#treemap")

      // Remove before renew
      section.selectAll("#tooltip, #tree-map, #legend").remove()

      const tooltip = section
        .append("div")
        .attr("id", "tooltip")
        .style("opacity", "0")

      const width = 900
      const height = 500

      const svg = section
        .append("svg")
        .attr("id", "tree-map")
        .attr("width", width)
        .attr("height", height)

      const fader = (color) => d3.interpolateRgb(color, "#fff")(0.2)
      const color = d3.scaleOrdinal().range(d3.schemeSpectral[11].map(fader))
      const legend = section.append("svg").attr("id", "legend")
      const treemap = d3.treemap().size([width, height]).paddingInner(1)

      try {
        const data = await d3.json(
          DATASETS[datasetState || DEFAULT_DATASET].FILE_PATH
        )

        const root = d3
          .hierarchy(data)
          .eachBefore(
            (d) => (d.data.id = d.parent ? d.parent.data.id + "." : "")
          )
          .sum((d) => d.value)
          .sort((a, b) => b.height - a.height || b.value - a.value)

        treemap(root)

        const cell = svg
          .selectAll("g")
          .data(root.leaves())
          .enter()
          .append("g")
          .attr("class", "group")
          .attr("transform", (d) => `translate(${d.x0}, ${d.y0})`)

        cell
          .append("rect")
          .attr("class", "tile")
          .attr("width", (d) => d.x1 - d.x0)
          .attr("height", (d) => d.y1 - d.y0)
          .attr("data-name", (d) => d.data.name)
          .attr("data-category", (d) => d.data.category)
          .attr("data-value", (d) => d.data.value)
          .style("stroke", "black")
          .style("fill", (d) => color(d.data.category))
          .on("mousemove", (e, d) => {
            tooltip.style("opacity", "0.98").attr("data-value", d.data.value)

            tooltip
              .html(
                `Name: ${d.data.name}<br>Category: ${d.data.category}<br>Value: ${d.data.value}`
              )
              .style("left", `${e.pageX + 10}px`)
              .style("top", `${e.pageY + 20}px`)
          })
          .on("mouseout", () => tooltip.style("opacity", "0"))

        cell
          .append("text")
          .selectAll("tspan")
          .data((d) => d.data.name.split(/(?=[A-Z][^A-Z])/g))
          .enter()
          .append("tspan")
          .attr("x", 4)
          .attr("y", (d, i) => 13 + i * 10)
          .text((d) => d)

        const LEGEND_WIDTH = 500
        const LEGEND_RECT_SIZE = 15
        const LEGEND_H_SPACING = 150
        const LEGEND_V_SPACING = 10
        const LEGEND_TEXT_X_OFFSET = 3
        const LEGEND_TEXT_Y_OFFSET = -2
        const legendElemsPerRow = Math.floor(LEGEND_WIDTH / LEGEND_H_SPACING)

        legend.attr("width", LEGEND_WIDTH).attr("height", 200)

        let categories = root.leaves().map((nodes) => nodes.data.category)

        categories = categories.filter(
          (category, index, self) => self.indexOf(category) === index
        )

        const legendElement = legend
          .append("g")
          .attr("transform", `translate(60, 20)`)
          .selectAll("g")
          .data(categories)
          .enter()
          .append("g")
          .attr(
            "transform",
            (d, i) =>
              `translate(${(i % legendElemsPerRow) * LEGEND_H_SPACING}, ${
                Math.floor(i / legendElemsPerRow) * LEGEND_RECT_SIZE +
                LEGEND_V_SPACING * Math.floor(i / legendElemsPerRow)
              })`
          )

        legendElement
          .append("rect")
          .attr("class", "legend-item")
          .attr("width", LEGEND_RECT_SIZE)
          .attr("height", LEGEND_RECT_SIZE)
          .attr("fill", (d) => color(d))

        legendElement
          .append("text")
          .attr("x", LEGEND_RECT_SIZE + LEGEND_TEXT_X_OFFSET)
          .attr("y", LEGEND_RECT_SIZE + LEGEND_TEXT_Y_OFFSET)
          .text((d) => d)
          .style("font-size", "")
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [datasetState])

  return (
    <>
      <Navbar />
      <section id="treemap">
        <div id="links-div">
          {Object.keys(DATASETS).map((DATASET) => {
            return (
              <a
                onClick={() => setDatasetState(DATASET)}
                id={DATASET}
                key={DATASET}
                className="link"
              >
                {DATASETS[DATASET].TITLE} Data Set
              </a>
            )
          })}
        </div>
        <h1 id="title">{DATASETS[datasetState].TITLE}</h1>
        <h3 id="description">{DATASETS[datasetState].DESCRIPTION}</h3>
      </section>
    </>
  )
}

export default Treemap
