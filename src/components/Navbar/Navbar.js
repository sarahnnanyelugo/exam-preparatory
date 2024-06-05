import React, { useContext, useEffect, useRef, useState } from "react";
import "./navbar.scss";
import Logo from "../../assets/images/logo.png";
import Menu from "../../assets/images/menu.svg";
import Person from "../../assets/images/person.svg";
import Bell from "../../assets/images/bell.svg";
import Wrench from "../../assets/images/wrench.svg";
import Bell2 from "../../assets/images/bell2.svg";
import { Link, NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Dropdown from "react-bootstrap/Dropdown";
import AuthContext from "../../context/AuthProvider";
import { useMediaQuery } from "react-responsive";
import Offcanvas from "react-bootstrap/Offcanvas";
import { toggleSubscribeModal } from "../../store/slices/adminSlice";
import { useDispatch } from "react-redux";
import { UnsubscribeModal } from "./UnsubscribeModal";

export const Navbar = () => {
  const dispatch = useDispatch();
  const useDesktopMediaQuery = () =>
    useMediaQuery({ query: "(min-width: 769px)" });

  const useTabletAndBelowMediaQuery = () =>
    useMediaQuery({ query: "(max-width: 768px)" });

  const Desktop = ({ children }) => {
    const isDesktop = useDesktopMediaQuery();

    return isDesktop ? children : null;
  };

  const TabletAndBelow = ({ children }) => {
    const isTabletAndBelow = useTabletAndBelowMediaQuery();

    return isTabletAndBelow ? children : null;
  };
  const location = useLocation();
  const prevUrlRef = useRef(null);
  const [showNav, setShowNav] = useState(true);
  const { user, logout, roles } = useContext(AuthContext);
  const [showSide, setShowSide] = useState(false);

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

  const unSubscribeFromChannel = () => {
    dispatch(toggleSubscribeModal({ action: true }));
  };
  return (
    <>
      <ToastContainer />
      <Desktop>
        <div className={`nav-container flexy flexyM${showNav ? "" : "hide"} `}>
          <div className="logo-holder  col-md-1 flexy col-2">
            {" "}
            <Link to={"/"}>
              {" "}
              <img className="   logo" src={Logo} alt="Scholar" />
            </Link>
          </div>
          <div className="flexy navs dn">
            <NavLink activeclassname="active" className="navlinks" to={"/"}>
              <button> Home</button>
            </NavLink>{" "}
            <NavLink
              activeclassname="active"
              className="navlinks"
              to={"/test-analysis"}
            >
              <button> Test Analysis</button>
            </NavLink>{" "}
            <NavLink
              activeclassname="active"
              className="navlinks"
              to={"/wallet"}
            >
              <button> Buy Units</button>
            </NavLink>{" "}
            <NavLink
              activeclassname="active"
              className="navlinks"
              to={"/referrals"}
            >
              <button> Refer a friend</button>
            </NavLink>{" "}
          </div>
          <div className="flexyM flexy last-menu">
            {!!roles.length && (
              <Dropdown.Toggle
                title={"Admin Area"}
                align="start"
                id="admin-area"
              >
                <NavLink className="navlinks" to={"/admin/dashboard"}>
                  <img src={Wrench} alt="Scholar" />
                </NavLink>{" "}
              </Dropdown.Toggle>
            )}

            <Dropdown className="ml3">
              <Dropdown.Toggle align="start" id="dropdown-menu-align-start">
                <img className="  " src={Bell} alt="Scholar" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <div className="col-md-2 notification-body">
                    <div className="flexy flexyM">
                      {" "}
                      <h6>Notifications</h6>
                      {/*<small>Mark as read</small>*/}
                    </div>
                    <hr />
                    <center>
                      <img
                        className="mt5  "
                        src={user.profile_picture || Bell2}
                        alt="Scholar"
                      />
                      <p>
                        No notifications yet <br />
                        Messages and alerts about your account will show up
                        here.
                      </p>
                    </center>
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
              <Dropdown.Toggle align="start" id="dropdown-menu-align-start">
                <div className="menu-holder">
                  <img className="menu-icon" src={Menu} alt="Scholar" />
                  <img
                    className="person"
                    src={user.profile_picture || Person}
                    alt="Scholar"
                  />
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/my-account">
                  <div className="navs ">
                    {" "}
                    <h6 style={{ fontSize: "14px" }}>
                      My Account ({user.email})
                    </h6>
                  </div>
                </Dropdown.Item>
                {!!user.subscribed && (
                  <Dropdown.Item onClick={unSubscribeFromChannel}>
                    <div className="navs ">
                      <p style={{ color: "#646862" }}>
                        {" "}
                        Subscribed to {user.subscribed.lastname}'s Channel
                      </p>
                    </div>
                  </Dropdown.Item>
                )}
                <Dropdown.Item onClick={logoutSet}>
                  <div className="navs ">
                    <p style={{ color: "#DE1E1E" }}> Sign out</p>
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </Desktop>
      <TabletAndBelow>
        <div
          className={`nav-container nav-mobile flexy flexyM${
            showNav ? "" : "hide"
          } `}
        >
          <div className="logo-holder  col-md-1 flexy col-2">
            {" "}
            <Link to={"/"}>
              {" "}
              <img className="logo" src={Logo} alt="Scholar" />
            </Link>
            <img
              onClick={handleMenu}
              className="menu-icon div-img offset-6"
              src={Menu}
              alt="Scholar"
            />
          </div>
          <div className="flexyM flexy last-menu">
            <Dropdown>
              <Dropdown.Toggle align="start" id="dropdown-menu-align-start">
                <div className="menu-holderm">
                  <img
                    className="person"
                    src={user.profile_picture || Person}
                    alt="Scholar"
                  />
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/my-account">
                  <div className="navs ">
                    {" "}
                    <h6 style={{ fontSize: "14px" }}>
                      My Account ({user.email})
                    </h6>
                  </div>
                </Dropdown.Item>
                {!!user.subscribed && (
                  <Dropdown.Item onClick={unSubscribeFromChannel}>
                    <div className="navs ">
                      <p style={{ color: "#646862" }}>
                        {" "}
                        Subscribed to {user.subscribed.lastname}'s Channel
                      </p>
                    </div>
                  </Dropdown.Item>
                )}
                <Dropdown.Item onClick={logoutSet}>
                  <div className="navs ">
                    <p style={{ color: "#DE1E1E" }}> Sign out</p>
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <Offcanvas
          show={showSide}
          onHide={handleClose}
          backdrop={true}
          scroll={false}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title></Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className={"menu"}>
            <div>
              <NavLink activeclassname="active" className="navlinks" to={"/"}>
                <button> Home</button>
              </NavLink>{" "}
            </div>
            <div>
              <NavLink
                activeclassname="active"
                className="navlinks"
                to={"/test-analysis"}
              >
                <button> Test Analysis</button>
              </NavLink>{" "}
            </div>
            <div>
              <NavLink
                activeclassname="active"
                className="navlinks"
                to={"/wallet"}
              >
                <button> Buy Units</button>
              </NavLink>{" "}
            </div>
            <div>
              <NavLink
                activeclassname="active"
                className="navlinks"
                to={"/referrals"}
              >
                <button> Refer a friend</button>
              </NavLink>{" "}
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </TabletAndBelow>
      {user.subscribed && <UnsubscribeModal />}
    </>
  );
};
