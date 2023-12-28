import "./App.css"
import { HashRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home/Home"
import Navbar from "./Navbar"
import BarChart from "./pages/BarChart/BarChart"
import Choroplethmap from "./pages/Choroplethmap/Choroplethmap"
import Heatmap from "./pages/Heatmap/Heatmap"
import Treemap from "./pages/Treemap/Treemap"
import ScatterPlot from "./pages/ScatterPlot/ScatterPlot"

function App() {
  return (
    <>
      <Navbar />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/choropleth" element={<Choroplethmap />} />
          <Route path="/heatmap" element={<Heatmap />} />
          <Route path="/treemap" element={<Treemap />} />
          <Route path="/barchart" element={<BarChart />} />
          <Route path="/scatterplot" element={<ScatterPlot />} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
