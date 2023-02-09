import React from 'react';
import Navbar from './components/navbar';
import Gnavbar from './components/gnavbar';
import {  Route, Routes } from "react-router-dom";
import Signin from './components/signin';
import Signup from './components/signup';
import  Portfolio from './components/portfolio';
import Search from './components/search';
import './App.css';
import Dash from './components/dash';
import Home from './components/home';
import Lout from './components/lout';
import Wlist from './components/wlist';
const App = () => {
  return (
    <div>
      {/* <Navbar/> */}
      <Routes>
        <Route path='/' element={<Home></Home>} />
        <Route path='/portfolio' element={<Portfolio></Portfolio>} />
        <Route path='/signin' element={<Signin></Signin>} />
        <Route path='/signup' element={<Signup></Signup>} />
        <Route path='/search' element={<Search></Search>} />
        <Route path='/dash' element={<Dash></Dash>} />
        <Route path='/lout' element={<Lout></Lout>} />
        <Route path='/wlist' element={<Wlist></Wlist>} />

        


      </Routes>

      {/* <Gnavbar/> */}

    </div>


  )
}

export default App