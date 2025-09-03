import Hero from "../components/Hero";
import Services from "../components/Services";
import Countries from "../components/Countries";
import Blogs from "../components/Blogs";
import Contact from "../components/Contact";

function Home() {
  return (
    <div>
      <Hero/>
      <Services/>
      <Countries/>
      <Blogs/>
      <Contact/>
    </div>
  );
}

export default Home;
