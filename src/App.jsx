import "./App.css"
import { HashRouter, Routes, Route } from "react-router-dom"
import Choroplethmap from "./pages/Choroplethmap/Choroplethmap"
import Heatmap from "./pages/Heatmap/Heatmap"
import Home from "./pages/Home/Home"
import Treemap from "./pages/Treemap/Treemap"
import BarChart from "./pages/BarChart/BarChart"
import Navbar from "./Navbar"

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
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
