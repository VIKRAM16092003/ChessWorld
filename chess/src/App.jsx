import React from 'react'
import StartGame from './Pages/StartGame/StartGame'
import {Route, Routes} from "react-router-dom";
import Home from './Pages/Home/Home';
import { Toaster } from 'sonner'
import NavBar from './components/navbar';
const App = () => {
  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/play" element={<StartGame/>}/>
         <Route path="/about" element={<StartGame/>}/>
      </Routes>
      <Toaster richColors position="top-center" />
      
    </div>
  )
}

export default App;