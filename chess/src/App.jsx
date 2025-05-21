import React from 'react'
import StartGame from './Pages/StartGame/StartGame'
import About from './About'
import {Route, Routes} from "react-router-dom";
import Home from './Pages/Home/Home';
import { Toaster } from 'sonner'
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Contact from './Pages/Contact';
import { FreePlan } from './Pages/FreePlan';
import { BasicPlan } from './Pages/BasicPlan';
import { PremiumPlan } from './Pages/PremiumPlan';
import Analyse from './Analyse';
import  Lesson  from './Lesson';
import LessonDetail from './LessonDetail';
import Reminder from './Reminder';
import Progress from './Progress';
import Tracker from './Tracker';
import Pricing from './PricingPlan';
import Features from './Pages/Features';
import Blog from './Blog'
import Terms from './Terms'
import Privacy from './Privacy'
import Puzzles from './Pages/Puzzles';

const App = () => {
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <NavBar/>
      <div style={{ flex: "1" }}>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/privacy" element={<Privacy/>}/>
        <Route path="/blog" element={<Blog/>}/>
        <Route path="/terms" element={<Terms/>}/>
        <Route path="/play" element={<StartGame/>}/>
         <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/freePlan" element={<FreePlan/>}/>
        <Route path="/basicPlan" element={<BasicPlan/>}/>
        <Route path="/premiumPlan" element={<PremiumPlan/>}/>
        <Route path="/puzzles" element={<Puzzles/>}/>
        <Route path="/analyse" element={<Analyse/>}/>
        <Route path="/lesson" element={<Lesson/>}/>
        <Route path="/lesson/:id" element={<LessonDetail />} />
        <Route path="/reminder" element={<Reminder/>}/>
        <Route path="/progress" element={<Progress/>}/>
        <Route path="/tracker" element={<Tracker/>}/>
        <Route path="/pricing" element={<Pricing/>}/>
        <Route path="/features" element={<Features/>}/>



      </Routes>
      </div>
      <Footer/>
      <Toaster richColors position="top-center" />
      </div>
    </div>
    
  )
}

export default App;