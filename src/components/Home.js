import React from "react"
import { Link } from 'react-router-dom'
import logo from '../images/DailyDollarNoBack.png';

const Home = props => {

  return (
      <div style={{textAlign: 'center', color: "white"}}>
   

        <br></br>
        <br></br>
        <img className="mainLogo" src={logo} alt="Daily Dollar Logo"></img>
        <br></br>
        <h1>Place home info here</h1>
      </div>
  );
};

export default Home