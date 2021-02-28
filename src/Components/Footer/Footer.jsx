import React from "react";
import "./footer.scss";
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
            <PhoneEnabled /> 123 456 0789
          </div>
          <div className="contactItem">
            <Home />
            IIITD, New Delhi, 110020
          </div>
          <div className="contactItem">
            {" "}
            <Mail /> johndoe@johndoe.com
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
          <div className="socialItem">
            <GitHub />
          </div>
          <div className="socialItem">
            <LinkedIn />
          </div>
          <div className="socialItem">
            <Twitter />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
