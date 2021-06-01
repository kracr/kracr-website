import React from "react";
import "./footer.scss";

import { Link } from 'react-router-dom';

import {
  PhoneEnabled,
  Home,
  Mail,
  GitHub,
  LinkedIn,
  Twitter,
  Favorite,
} from "@material-ui/icons";


function Footer() {
  return (
    <div className="footer">
      <div className="wrapper">
        {" "}
        <div className="left">
          <div className="contactItem">
            <PhoneEnabled /> 01126907455
          </div>
          <div className="contactItem">
            <Home />
            IIITD, New Delhi, 110020
          </div>
          <div className="contactItem">
            {" "}
            <Mail /> raghava.mutharaju@iiitd.ac.in
          </div>
        </div>
        <div className="middle">
          We are a part of Indraprastha Institute of Information Technology
          Delhi. <br></br>
          <div>
            © 2021 KRaCR Lab, made by <Favorite />
          </div>
        </div>
        <div className="right">
          <div className="GitHub">
		  <a href="https://github.com/kracr"> 	    	<GitHub /> </a>
     
		
          </div>
          <div className="socialItem">
		  <a href="https://www.linkedin.com/in/kracr-lab-425762204/">
            <LinkedIn /> </a>
          </div>
          <div className="socialItem">
             <a href="https://twitter.com/KracrL"> </a>
            <Twitter />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
