/* eslint-disable no-undef */
import Navbar from "../../components/Navbar/Navbar"
import "./Treemap.css"
import { useEffect, useState } from "react"

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
const urlParams = new URLSearchParams(window.location.hash)
const DEFAULT_DATASET = "videogames"

export default function Treemap() {
  const [datasetState, setDatasetState] = useState(DEFAULT_DATASET)
  console.log("State", datasetState)

  const section = d3.select("#treemap")
  const tooltip = section
    .append("div")
    .attr("id", "tooltip")
    .style("opacity", "0")
  const linksDiv = section.append("div").attr("id", "links-div")
  const datasetKeys = Object.keys(DATASETS)

  useEffect(() => {
    console.log("setDatasetState: ", urlParams.get("#/treemap?data"))
    setDatasetState(urlParams.get("#/treemap?data"))
  }, [datasetState])

  const DATASET = DATASETS[datasetState || DEFAULT_DATASET]
  console.log("DATASET AQ: ", DATASET)

  for (
    let datasetIndex = 0;
    datasetIndex < datasetKeys.length;
    datasetIndex++
  ) {
    const datasetKey = datasetKeys[datasetIndex]
    const dataset = DATASETS[datasetKey]

    linksDiv
      .append("a")
      .attr("id", datasetKey)
      .attr("class", "links")
      .text(dataset.TITLE + " Data Set")
      .attr("href", `#/treemap?data=${datasetKey}`)
    // .on("click", () => {
    //   setDatasetState(datasetKey)
    // })
  }

  section.append("h1").attr("id", "title").text(DATASET.TITLE)

  section.append("h3").attr("id", "description").text(DATASET.DESCRIPTION)

  const width = 900,
    height = 500

  const svg = section
    .append("svg")
    .attr("id", "tree-map")
    .attr("width", width)
    .attr("height", height)

  const fader = (color) => d3.interpolateRgb(color, "#fff")(0.2)

  const color = d3.scaleOrdinal().range(d3.schemeSpectral[11].map(fader))

  const legend = section.append("svg").attr("id", "legend")

  const treemap = d3.treemap().size([width, height]).paddingInner(1)
  console.log(DATASET.FILE_PATH)
  d3.json(DATASET.FILE_PATH).then((data) => {
    const root = d3
      .hierarchy(data)
      .eachBefore((d) => (d.data.id = d.parent ? d.parent.data.id + "." : ""))
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
        tooltip.style("opacity", "0.9").attr("data-value", d.data.value)

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
      .style("font-size", ".8rem")
      .style("fill", "black")

    const LEGEND_WIDTH = 500,
      LEGEND_RECT_SIZE = 15,
      LEGEND_H_SPACING = 150,
      LEGEND_V_SPACING = 10,
      LEGEND_TEXT_X_OFFSET = 3,
      LEGEND_TEXT_Y_OFFSET = -2,
      legendElemsPerRow = Math.floor(LEGEND_WIDTH / LEGEND_H_SPACING)

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
  })

  return (
    <>
      <Navbar />
      <section id="treemap"></section>
    </>
  )
}
