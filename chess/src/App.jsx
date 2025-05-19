import React from 'react'
import StartGame from './Pages/StartGame/StartGame'
import {Route, Routes} from "react-router-dom";
import Home from './Pages/Home/Home';
import { Toaster } from 'sonner'
import NavBar from './components/NavBar';
import Footer from './components/Footer';
const App = () => {
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/play" element={<StartGame/>}/>
         <Route path="/about" element={<StartGame/>}/>
      </Routes>
      <Footer/>
      <Toaster richColors position="top-center" />
      
    </div>
  )
}

export default App;