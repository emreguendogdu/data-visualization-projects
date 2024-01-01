import "./Home.css"
export default function Home() {
  return (
    <>
      <header id="home-header">
        <a
          id="title"
          href="
        https://www.linkedin.com/in/osmangund/"
          target="_blank"
          rel="noreferrer"
        >
          osmangund®
        </a>
      </header>
      <main id="home">
        <article style={{ "--order": 1 }}>
          <a href="/barchart">
            <h3 className="title">Bar Chart</h3>
            <p className="description">US gross domestic product graph</p>
          </a>
        </article>
        <article style={{ "--order": 2 }}>
          <a href="/choropleth">
            <h3 className="title">Choropleth</h3>
            <p className="description">US educational attainment graph</p>
          </a>
        </article>
        <article style={{ "--order": 3 }}>
          <a href="/heatmap">
            <h3 className="title">Heat Map</h3>
            <p className="description">Global land surface temperature graph</p>
          </a>
        </article>
        <article style={{ "--order": 4 }}>
          <a href="/treemap">
            <h3 className="title">Tree Map</h3>
            <p className="description">Three graphs in distinct categories</p>
          </a>
        </article>
        <article style={{ "--order": 5 }}>
          <a href="/scatterplot">
            <h3 className="title">Scatter Plot</h3>
            <p className="description">Doping in cycling scatter graph</p>
          </a>
        </article>
      </main>
    </>
  )
}
