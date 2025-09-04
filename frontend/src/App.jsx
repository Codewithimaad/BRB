import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useLanguageChange } from "./hooks/useLanguageChange";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Countries from "./pages/Countries";
import Blogs from "./pages/Blogs";
import BlogDetails from "./pages/BlogDetails";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import About from "./pages/About";

function App() {
  useLanguageChange();

  return (
    <Router>
      <Navbar />

      {/* Main wrapper with background */}
      <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100">
        {/* Gradient Blobs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-green-400/20 to-emerald-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-teal-400/20 to-cyan-600/20 rounded-full blur-3xl"></div>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/countries" element={<Countries />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
}

export default App;
