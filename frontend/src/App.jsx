import { Routes, Route } from "react-router-dom";
import "./App.css";
import { FeaturesSection } from "./components/FeaturesSection";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import FAQs from "./pages/FAQs.jsx";
import { Testimonial } from "./components/Testimonial";
import Calculator from "./pages/Calculator.jsx";
import SolarConsultationForm from "./components/SolarConsultationForm";
import Products from "./pages/Products";
import Aboutus from "./pages/Aboutus";
import Location from "./components/Location";
import ConsultationForm from "./pages/ConsultationForm";

// Home component with your sections
function Home() {
  return (
    <>
      <Hero />
      <FeaturesSection />
      <Location/>
      <Testimonial />
      <Calculator/>
      <FAQs />
    </>
  );
}

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/products" element={<Products />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/consultationForm" element={<ConsultationForm />} />
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
