import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import StartGame from "./Pages/StartGame/StartGame";
import About from "./Pages/About";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import { Toaster } from "sonner";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Contact from "./Pages/Contact";
import { FreePlan } from "./Pages/FreePlan";
import { BasicPlan } from "./Pages/BasicPlan";
import { PremiumPlan } from "./Pages/PremiumPlan";
import Analyse from "./Pages/Analyse";
import Lesson from "./Pages/Lesson";
import LessonDetail from "./Pages/LessonDetail";
import Reminder from "./Pages/Reminder";
import Progress from "./Pages/Progress";
import Tracker from "./Pages/Tracker";
import Pricing from "./PricingPlan";
import Features from "./Pages/Features";
import Blog from "./Pages/Blog";
import Puzzles from "./Pages/Puzzles";
import Terms from "./Pages/Terms";
import Privacy from "./Pages/Privacy";
import Testimonials from "./Testimonials";
import SuggestedPuzzles from "./Pages/SuggestedPuzzle";
import Registerpage from "./Pages/registerpage";
import Tacticspage from "./Pages/Taticspage";
import ChessTournaments from "./Pages/ChessTournaments";
import BlitzGame from "./Pages/Blitzgame";
import RoundRobin from "./Pages/RoundRobin ";
import SwissGame from "./Pages/SwissGame";
import MatchPlay from "./Pages/MatchPlay";
import TeamTournament from "./Pages/TeamTournament";

const App = () => {
  return (
    <div>
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        {/* <NavBar /> */}
        <DndProvider backend={HTML5Backend}>
          <div style={{ flex: "1" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Registerpage />} />
              <Route path="/tournaments" element={<ChessTournaments />} />
              <Route path="/blitzgame" element={<BlitzGame />} />
              <Route path="/roundrobin" element={<RoundRobin />} />
              <Route path="/matchplay" element={<MatchPlay />} />
              <Route path="/swissgame" element={<SwissGame />} />
              <Route path="/teamtournament" element={<TeamTournament />} />
              <Route path="/tactics" element={<Tacticspage />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/SuggestedPuzzles" element={<SuggestedPuzzles />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/test" element={<Testimonials />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/play" element={<StartGame />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/freePlan" element={<FreePlan />} />
              <Route path="/basicPlan" element={<BasicPlan />} />
              <Route path="/premiumPlan" element={<PremiumPlan />} />
              <Route path="/puzzles" element={<Puzzles />} />
              <Route path="/analyse" element={<Analyse />} />
              <Route path="/lesson" element={<Lesson />} />
              <Route path="/lesson/:id" element={<LessonDetail />} />
              <Route path="/reminder" element={<Reminder />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/tracker" element={<Tracker />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/features" element={<Features />} />
            </Routes>
          </div>
        </DndProvider>
        <Footer />
        <Toaster richColors position="top-center" />
      </div>
    </div>
  );
};




export default App;
