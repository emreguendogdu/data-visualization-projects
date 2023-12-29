import "./Home.css"
export default function Home() {
  return (
    <>
      <main id="home">
        <article>
          <a href="/#/barchart">
            <h3 className="title">Bar Chart</h3>
            <p>
              Visualize United States gross domestic product with a bar graph.{" "}
            </p>
          </a>
        </article>
        <article>
          <a href="/#/choropleth">
            <h3 className="title">Choropleth Map</h3>
            <p>
              Display United States Educational Attainment with choropleth,
              statistical thematic, map.{" "}
            </p>
          </a>
        </article>
        <article>
          <a href="/#/heatmap">
            <h3 className="title">Heat Map</h3>
            <p>
              Visualize monthy global land surface temperature with a heat map.
            </p>
          </a>
        </article>
        <article>
          <a href="/#/treemap">
            <h3 className="title">Tree Map</h3>
            <p>
              Visualize most sold video games by platform, highest grossing
              movies by genre and most pledged kickstarter campaigns by category
              with a treemap diagram.
            </p>
          </a>
        </article>
        <article>
          <a href="/#/scatterplot">
            <h3 className="title">Scatter Plot</h3>
            <p>
              Visualize doping in professional bicycle racing with a scatter
              plot.
            </p>
          </a>
        </article>
      </main>
    </>
  )
}
