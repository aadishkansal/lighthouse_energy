

import './App.css'
import { FeaturesSection } from './components/FeaturesSection'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import FAQs from './components/FAQs'
import { Testimonial } from './components/Testimonial'


function App() {


  return (
    <div>
      <Navbar/>
      <Hero/>
      <FeaturesSection/>
      <Testimonial/>
      <FAQs />
      <Footer/>
   

    </div>
  )
}

export default App
