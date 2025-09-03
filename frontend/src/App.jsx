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
  // Use the language change hook to force re-renders when language changes
  useLanguageChange();

  return (
    <Router>
      <Navbar />
      
                  <div className="relative min-h-screen w-full overflow-hidden">
                    <div className='fixed inset-0 -z-10'>
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
          </div>
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
      <Footer/>
    </Router>
  );
}

export default App;
