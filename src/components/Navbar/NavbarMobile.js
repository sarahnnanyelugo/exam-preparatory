import React, { useContext, useEffect, useRef, useState } from "react";
import "./navbar.scss";
import Logo from "../../assets/images/logo.png";
import Menu from "../../assets/images/menu.svg";
import Person from "../../assets/images/person.svg";
import { Link, NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Dropdown from "react-bootstrap/Dropdown";
import AuthContext from "../../context/AuthProvider";
import Offcanvas from 'react-bootstrap/Offcanvas';

export const NavbarMobile = () => {
  const location = useLocation();
  const prevUrlRef = useRef(null);
  const [showNav, setShowNav] = useState(true);
  const { user, logout } = useContext(AuthContext);
  const [ showSide, setShowSide] = useState(false);

  const handleClose = () => setShowSide(false);
  const handleMenu = () => setShowSide((s) => !s);

  const logoutSet = () => logout();



  useEffect(() => {
    const currentUrl = window.location.pathname;
    if (prevUrlRef.current !== currentUrl) {
      prevUrlRef.current = currentUrl;
      setTimeout(() => {
        switch (currentUrl) {
          case "/":
            setShowNav(false);
            break;
          case "/test-instructions":
            setShowNav(false);
            break;
          case "/question":
            setShowNav(false);
            break;
          case "/summary-page":
            setShowNav(false);
            break;

          default:
            setShowNav(false);
            break;
        }
        localStorage.setItem("showNav", showNav);
      }, 200);
    }
  });

  return (
    <>
      <ToastContainer />
      <div className={`nav-container nav-mobile flexy flexyM${showNav ? "" : "hide"} `}>
        <div className="logo-holder  col-md-1 flexy col-2">
          {" "}

          <Link to={"/"}>
            {" "}
            <img className="logo" src={Logo} alt="Scholar" />
          </Link>
          <img onClick={handleMenu} className="menu-icon div-img" src={Menu} alt="Scholar" />
        </div>
        <div className="flexyM flexy last-menu">
          <Dropdown>
            <Dropdown.Toggle align="start" id="dropdown-menu-align-start">
              <div className="menu-holderm">
                <img className="person" src={user.profile_picture || Person} alt="Scholar" />
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/my-account">
                <div className="navs ">
                  {" "}
                  <h6 style={{ fontSize: "14px" }}>My Account</h6>
                </div>
              </Dropdown.Item>
              <Dropdown.Item  onClick={logoutSet} >
                <div className="navs ">
                  <p style={{ color: "#DE1E1E" }}> Sign out</p>
                </div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      <Offcanvas show={showSide} onHide={handleClose} backdrop={true} scroll={false}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className={"menu"} >
          <div>
            {/*<Link to={"/"}>*/}
            {/*  {" "}*/}
            {/*  Home*/}
            {/*</Link>*/}
            <NavLink activeclassname="active" className="navlinks" to={"/"}>
              <button> Home</button >
            </NavLink>{" "}
          </div>
          <div>
            <Link to={"/test-analysis"}>
              {" "}
              Test Analysis
            </Link>
          </div>
         <div>
           <Link to={"/wallet"}>
             {" "}
             Buy Units
           </Link>
         </div>

        </Offcanvas.Body>
      </Offcanvas>

    </>
  );
};
