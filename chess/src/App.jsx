import React from 'react'
import StartGame from './Pages/StartGame/StartGame'
import About from './Pages/About'
import {Route, Routes} from "react-router-dom";
import Home from './Pages/Home/Home';
import { Toaster } from 'sonner'
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Contact from './Pages/Contact';
import { FreePlan } from './Pages/FreePlan';
import { BasicPlan } from './Pages/BasicPlan';
import { PremiumPlan } from './Pages/PremiumPlan';
import Analyse from './Pages/Analyse';
import  Lesson  from './Pages/Lesson';
import LessonDetail from './Pages/LessonDetail';
import Reminder from './Pages/Reminder';
import Progress from './Pages/Progress';
import Tracker from './Pages/Tracker';
import Pricing from './PricingPlan';
import Features from './Pages/Features';
import Blog from './Pages/Blog'
import Puzzles from './Pages/Puzzles'
import Terms from './Pages/Terms'
import Privacy from './Pages/Privacy'
import Testimonials from './Testimonials'
import SuggestedPuzzles from './Pages/SuggestedPuzzle';
import Tournment from './Pages/Tournment';
import AddMoney from './Pages/AddMoney';
import Room from './Pages/WaitingRoom';
import Classical from './Pages/Tournament_page/Classical'
import RazorPay from './Pages/RazorPay'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Round from './Pages/RoundRobin'
import Tournament from './Pages/Tournment'

const App = () => {
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
       {/* <NavBar/>  */}
      <div style={{ flex: "1" }}>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/room" element={<Room/>}/>
        <Route path="/classical" element={<Classical/>}/>
        <Route path="/pay" element={<RazorPay/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/privacy" element={<Privacy/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/SuggestedPuzzles" element={<SuggestedPuzzles/>}/>
        <Route path="/blog" element={<Blog/>}/>
        <Route path="/test" element={<Testimonials/>}/>
        <Route path="/terms" element={<Terms/>}/>
        <Route path="/addmoney" element={<AddMoney/>}/>

        <Route path="/play" element={<StartGame/>}/>
         <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/freePlan" element={<FreePlan/>}/>
        <Route path="/basicPlan" element={<BasicPlan/>}/>
        <Route path="/premiumPlan" element={<PremiumPlan/>}/>
         <Route path="/tournment" element={<Tournment/>}/>
        <Route path="/puzzles" element={<Puzzles/>}/>
        <Route path="/analyse" element={<Analyse/>}/>
        <Route path="/lesson" element={<Lesson/>}/>
        <Route path="/lesson/:id" element={<LessonDetail />} />
        <Route path="/reminder" element={<Reminder/>}/>
        <Route path="/progress" element={<Progress/>}/>
        <Route path="/tracker" element={<Tracker/>}/>
        <Route path="/pricing" element={<Pricing/>}/>
        <Route path="/round" element={<Round/>}/>
        <Route path="/tournament" element={<Tournament/>}/>
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