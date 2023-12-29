/* eslint-disable no-undef */
import { useEffect } from "react"
import "./Choroplethmap.css"
import Navbar from "../../components/Navbar/Navbar"

export default function Choroplethmap() {
  useEffect(() => {
    const section = d3.select("#choroplethmap")

    section
      .append("h1")
      .attr("id", "title")
      .text("United States Educational Attainment")

    section
      .append("p")
      .attr("id", "description")
      .text(
        "Percentage of individuals aged 25 and above holding a bachelor's degree or higher (2010-2014)"
      )

    const svg = section.append("svg").attr("width", 900).attr("height", 600)

    const source = section
      .append("p")
      .attr("id", "source")
      .text("Source: ")
      .style("padding-left", "400px")

    source
      .append("a")
      .text("USDA Economic Research Service")
      .attr(
        "href",
        "https://www.ers.usda.gov/data-products/county-level-data-sets/download-data.aspx"
      )
      .attr("target", "_blank")

    const tooltip = section
      .append("div")
      .attr("id", "choropleth-tooltip")
      .attr("style", "opacity: 0;")

    const x = d3.scaleLinear().domain([2.6, 75.1]).rangeRound([600, 860])

    const color = d3
      .scaleThreshold()
      .domain(d3.range(2.6, 75.1, (75.1 - 2.6) / 8))
      .range(d3.schemeBlues[9])

    const legend = svg
      .append("g")
      .attr("id", "legend")
      .attr("transform", "translate(0, 30)")

    legend
      .selectAll("rect")
      .data(
        color.range().map((d) => {
          d = color.invertExtent(d)
          if (d[0] === null) d[0] = x.domain()[0]
          if (d[1] === null) d[1] = x.domain()[1]
          return d
        })
      )
      .enter()
      .append("rect")
      .attr("height", 8)
      .attr("width", (d) => (d[0] && d[1] ? x(d[1]) - x(d[0]) : x(null)))
      .attr("x", (d) => x(d[0]))
      .attr("fill", (d) => color(d[0]))

    legend
      .append("text")
      .attr("class", "caption")
      .attr("x", x.range()[0])
      .attr("y", -6)
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .style("font-size", ".75rem")
      .text("Percentages")

    legend
      .call(
        d3
          .axisBottom(x)
          .tickSize(13)
          .tickFormat((x) => Math.round(x) + "%")
          .tickValues(color.domain())
      )
      .select(".domain")
      .remove()

    const countyDataUrl =
      "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json"
    const eduDataUrl =
      "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json"

    const path = d3.geoPath()

    Promise.all([d3.json(countyDataUrl), d3.json(eduDataUrl)])
      .then((data) => ready(data[0], data[1]))
      .catch((err) => console.log(`Error: ${err}`))

    function ready(us, education) {
      svg
        .append("g")
        .attr("class", "countries")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.counties).features)
        .enter()
        .append("path")
        .attr("class", "county")
        .attr("data-fips", (d) => d.id)
        .attr("data-education", (d) => {
          const result = education.filter((obj) => obj.fips === d.id)
          return result[0].bachelorsOrHigher
        })
        .attr("fill", (d) => {
          const result = education.filter((obj) => obj.fips === d.id)
          return color(result[0].bachelorsOrHigher)
        })
        .attr("d", path)
        .on("mouseover", (event, d) => {
          const dataEducation = event.target.attributes["data-education"].value
          tooltip.attr("data-education", dataEducation).style("opacity", 0.9)

          tooltip
            .html(() => {
              const result = education.filter((obj) => obj.fips === d.id)
              return `${result[0]["area_name"]}, ${result[0]["state"]}, ${result[0]["bachelorsOrHigher"]}%`
            })
            .style("left", `${event.pageX + 10}px`)
            .style("top", `${event.pageY - 28}px`)
        })
        .on("mouseout", () => tooltip.style("opacity", 0))

      svg
        .append("path")
        .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
        .attr("class", "states")
        .attr("d", path)
    }
  })

  return (
    <>
      <Navbar />
      <section id="choroplethmap"></section>
    </>
  )
}
