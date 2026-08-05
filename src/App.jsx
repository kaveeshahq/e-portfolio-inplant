import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import ScrollProgress from "./components/ScrollProgress"
import ScrollToTop from "./components/ScrollToTop"
import BackToTop from "./components/BackToTop"
import Home from "./pages/Home"
import About from "./pages/About"
import Journey from "./pages/Journey"
import WeekDetail from "./pages/WeekDetail"
import Reflections from "./pages/Reflections"
import Faq from "./pages/Faq"
import NotFound from "./pages/NotFound"

function Shell() {
  const { pathname } = useLocation()

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <ScrollProgress />
      <Navbar />
      <ScrollToTop />
      {/* Keyed on pathname so each route replays the entrance animation. */}
      <main key={pathname} className="flex-1 animate-page-in">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="/journey/:id" element={<WeekDetail />} />
          <Route path="/reflections" element={<Reflections />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  )
}
