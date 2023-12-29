import "./App.css"
import { HashRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home/Home"
import BarChart from "./pages/BarChart/BarChart"
import Choroplethmap from "./pages/Choroplethmap/Choroplethmap"
import Heatmap from "./pages/Heatmap/Heatmap"
import Treemap from "./pages/Treemap/Treemap"
import ScatterPlot from "./pages/ScatterPlot/ScatterPlot"
import Footer from "./components/Footer/Footer"

function App() {
  return (
    <>
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
      <Footer />
    </>
  )
}

export default App
