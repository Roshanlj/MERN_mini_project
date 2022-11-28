import React from "react";
import {Link} from 'react-router-dom';
import bg from './Control-V.png';
import build from './build.png';
import './Homepage.css';

const Home = () => {
    return (
      <nav>
        <div className="head">
        <img className='fit' src={bg} alt=""/>
        <p className='reactin'>Reactin</p>
        <p className='tag1'>CHAT ON THE WEB</p>
        <p className='tag2'>With fast and amazing UI.</p>
        <Link to="/signup" onClick={() => {window.location.href="/signup"}}>
        <button className='btn1'>Sign Up</button>
        </Link>
        <Link to="/login" onClick={() => {window.location.href="/login"}}>
        <button className='btn2'>Login</button>
        </Link>
        <img className='bld' src={build} alt=""/>
        </div>
      </nav>
    )
  }

  export default Home;