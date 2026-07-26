import Footer from "../component/LandingLayout.tsx/Footer";
import LazyReveal from "../component/shared/Lazyloading";
import Navbar from "../component/LandingLayout.tsx/Navbar";
import Add from "./sections/Add";
import CTA from "./sections/CTA";
import Features from "./sections/Features";
import Hero from "./sections/Hero";
import HowItWorks from "./sections/HowItWorks";
import Testimonial from "./sections/Testimonial";

const Home = () => {
    return ( <div className="px-5 md:px-10">
        <Navbar/>
    <Hero />
    <LazyReveal>
        <Features  />
    </LazyReveal>
    <LazyReveal>
        <HowItWorks />
    </LazyReveal>
    
    <LazyReveal>
        <Add />
    </LazyReveal>
    <LazyReveal>
      <Testimonial />
    </LazyReveal>
    <LazyReveal>
        <CTA />
    </LazyReveal>
    <LazyReveal>
       <Footer />
    </LazyReveal>
    
    
    
    
    </div> );
}
 
export default Home;