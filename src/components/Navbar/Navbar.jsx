import "./Navbar.css"
export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <a href="/data-visualization-projects/">Home</a>
        </li>
        <li>
          <a
            className="router-nav-items"
            href="/data-visualization-projects/#/barchart"
          >
            Bar Chart
          </a>
        </li>
        <li>
          <a
            className="router-nav-items"
            href="/data-visualization-projects/#/choropleth"
          >
            Choropleth Map
          </a>
        </li>
        <li>
          <a
            className="router-nav-items"
            href="/data-visualization-projects/#/heatmap"
          >
            Heat Map
          </a>
        </li>
        <li>
          <a
            className="router-nav-items"
            href="/data-visualization-projects/#/treemap"
          >
            Tree Map
          </a>
        </li>
        <li>
          <a
            className="router-nav-items"
            href="/data-visualization-projects/#/scatterplot"
          >
            Scatter Plot
          </a>
        </li>
      </ul>
    </nav>
  )
}
