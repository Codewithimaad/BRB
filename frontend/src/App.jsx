import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useLanguageChange } from "./hooks/useLanguageChange";
import { AuthProvider } from "./context/apiContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Countries from "./pages/Countries";
import Blogs from "./pages/Blogs";
import BlogDetails from "./pages/BlogDetails";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import About from "./pages/About";
import GreenDotCursor from "./components/GreenDotCursor";

function App() {
  useLanguageChange();

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <GreenDotCursor/>

        {/* Main wrapper with background */}
        <div className="relative min-h-screen w-full overflow-hidden bg-slate-950">
          {/* Animated Grid Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-green-950/20">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)]"></div>
          </div>

          {/* Floating Orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-green-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-conic from-green-400/5 via-transparent to-green-500/5 rounded-full blur-3xl animate-spin" style={{ animationDuration: '20s' }}></div>
          </div>

          {/* Optional Gradient Blobs */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-green-400/20 to-emerald-600/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-teal-400/20 to-cyan-600/20 rounded-full blur-3xl"></div>

          {/* Routes */}
          <div className="relative z-10">
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
        </div>

        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
