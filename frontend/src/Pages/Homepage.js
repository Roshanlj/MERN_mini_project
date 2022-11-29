import React from "react";
import {Link} from 'react-router-dom';
import bg from './Control-V.png';
import build from './build.png';
import './Homepage.css';


const Home = () => {
    return (
        <div className="app">    
        <h1 className='reactin'>Reactin</h1>
        <p className='tag1'>CHAT ON THE WEB</p>
        <p className='tag2'>With fast and amazing UI.</p>
        <img className='fit' src={bg} alt=""/>
        <img className='bld' src={build} alt=""/>
        <Link to="/signup" onClick={() => {window.location.href="/signup"}}>
        <button className='btn1'>Sign Up</button>
        </Link>
        <Link to="/login" onClick={() => {window.location.href="/login"}}>
        <button className='btn2'>Login</button>
        </Link>
        </div>        
    )
  }

  export default Home;