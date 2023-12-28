export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <a href="/">
            Home
          </a>
        </li>
        <li>
          <a className="router-nav-items" href="/#/barchart">
            Bar Chart
          </a>
        </li>
        <li>
          <a className="router-nav-items" href="/#/choropleth">
            Choropleth Map
          </a>
        </li>
        <li>
          <a className="router-nav-items" href="/#/heatmap">
            Heat Map
          </a>
        </li>
        <li>
          <a className="router-nav-items" href="/#/treemap">
            Tree Map
          </a>
        </li>
        <li>
          <a className="router-nav-items" href="/#/scatterplot">
            Scatter Plot
          </a>
        </li>
      </ul>
    </nav>
  )
}
