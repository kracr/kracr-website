import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";
import LogoImage from "./Logo.png";

function NavBar() {
  const [navbar, setNavBar] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    updateWindowDimensions();
  }, []);

  const updateWindowDimensions = () => {
    if (window.innerWidth < 800) {
      setMenu(true);
    }
  };

  const changeBackground = () => {
    if (window.scrollY >= 100) {
      setNavBar(true);
    } else {
      setNavBar(false);
    }
  };

  const changeMenu = () => {
    if (menu) {
      setMenu(false);
    } else {
      setMenu(true);
    }
  };

  window.addEventListener("scroll", changeBackground);
  window.addEventListener("resize", updateWindowDimensions);

  return (
    <div className={navbar ? "Navbar active" : "Navbar"}>
      <div className="wrapper">
        <div className="left">
          <Link to="/">
            <img src={LogoImage} alt="Logo"></img>
          </Link>
        </div>
        <div className="right">
          <div className="menuWrapper">
            <ul className={menu ? "menuItems menuActive" : "menuItems"}>
              <Link to="/">
                <li>Home</li>
              </Link>
              <Link to="/team">
                <li>Team</li>
              </Link>
              <Link to="/Publications">
                <li>Publications</li>
              </Link>
              <Link to="/Projects">
                <li>Projects</li>
              </Link>
              <Link to="/news">
                <li>News</li>
              </Link>
            </ul>
          </div>

          <div
            className={menu ? "hamburger is-active" : "hamburger"}
            onClick={changeMenu}
          >
            <span class="line"></span>
            <span class="line"></span>
            <span class="line"></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
