import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import About from "./pages/About"
import Journey from "./pages/Journey"
import WeekDetail from "./pages/WeekDetail"
import Swot from "./pages/Swot"
import Reflections from "./pages/Reflections"
import Faq from "./pages/Faq"
import NotFound from "./pages/NotFound"

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/journey" element={<Journey />} />
            <Route path="/journey/:id" element={<WeekDetail />} />
            <Route path="/swot" element={<Swot />} />
            <Route path="/reflections" element={<Reflections />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}