import "./Home.css"
export default function Home() {

  return (
    <>
      <header id="home-header">
        <a
          id="title"
          href="
        https://www.linkedin.com/in/emregnd/"
          target="_blank"
          rel="noreferrer"
        >
          emregnd®
        </a>
      </header>
      <main id="home">
        <article style={{ "--order": 1 }}>
          <a href="/data-visualization-projects/#/barchart">
            <h3 className="title">Bar Chart</h3>
            <p className="description">US gross domestic product graph</p>
          </a>
        </article>
        <article style={{ "--order": 2 }}>
          <a href="/data-visualization-projects/#/choropleth">
            <h3 className="title">Choropleth</h3>
            <p className="description">US educational attainment graph</p>
          </a>
        </article>
        <article style={{ "--order": 3 }}>
          <a href="/data-visualization-projects/#/heatmap">
            <h3 className="title">Heat Map</h3>
            <p className="description">Global land surface temperature graph</p>
          </a>
        </article>
        <article style={{ "--order": 4 }}>
          <a href="/data-visualization-projects/#/treemap">
            <h3 className="title">Tree Map</h3>
            <p className="description">Three graphs in distinct categories</p>
          </a>
        </article>
        <article style={{ "--order": 5 }}>
          <a href="/data-visualization-projects/#/scatterplot">
            <h3 className="title">Scatter Plot</h3>
            <p className="description">Doping in cycling scatter graph</p>
          </a>
        </article>
      </main>
    </>
  )
}
