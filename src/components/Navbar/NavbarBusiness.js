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
import { ToastContainer, toast } from "react-toastify";
import Dropdown from "react-bootstrap/Dropdown";
import AuthContext from "../../context/AuthProvider";
import {useMediaQuery} from "react-responsive";
import Offcanvas from "react-bootstrap/Offcanvas";
import {InviteModal} from "../../pages/BusinessDashboard/InviteModal";
import {getBusinessDashboard} from "../../store/actions/adminActions";
import {useDispatch} from "react-redux";
import {toggleInviteModal} from "../../store/slices/adminSlice";

export const NavbarBusiness = () => {
  const dispatch = useDispatch();

  const useDesktopMediaQuery = () =>
      useMediaQuery({ query: '(min-width: 769px)' })

  const useTabletAndBelowMediaQuery = () =>
      useMediaQuery({ query: '(max-width: 768px)' })

  const Desktop = ({ children }) => {
    const isDesktop = useDesktopMediaQuery()

    return isDesktop ? children : null
  }

  const TabletAndBelow = ({ children }) => {
    const isTabletAndBelow = useTabletAndBelowMediaQuery()

    return isTabletAndBelow ? children : null
  }
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
          case "/admin":
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
        localStorage.setItem("showNavBusiness", showNav);
      }, 200);
    }
    return () => {
      dispatch(toggleInviteModal({action: false }));
    }
  },[]);
  const showRef = useRef(false);
  const openInviteModal = () => {
    dispatch(toggleInviteModal({action: true }));
  }
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
          <NavLink activeclassname="active" className="navlinks" to={"/business/dashboard"}>
            <button> Dashboard</button>
          </NavLink>{" "}
          <NavLink  className="navlinks" to={"/business/users"}>
            <button> User List</button>
          </NavLink>{" "}
          <NavLink activeclassname="active" className="navlinks" to={"/business/analysis"}>
            <button> Test Analysis</button>
          </NavLink>{" "}
          <NavLink activeclassname="active" className="navlinks" to={"/business/topup"}>
            <button> Top Up</button>
          </NavLink>{" "}
        </div>
        <div className="flexyM flexy last-menu">
            <button onClick={openInviteModal} className="ml3 btn-invite"> Invite members</button>
         {" "}
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
                    <img className="mt5  " src={user.profile_picture || Bell2} alt="Scholar" />
                    <p>
                      No notifications yet <br />
                      Messages and alerts about your account will show up here.
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
                <img className="person" src={user.profile_picture || Person} alt="Scholar" />
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/settings">
                <div className="navs ">
                  {" "}
                  <h6 style={{ fontSize: "14px" }}>My Account ({user.email})</h6>
                </div>
              </Dropdown.Item>
              <Dropdown.Item  onClick={logoutSet}>
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
                <Dropdown.Item href="/settings">
                  <div className="navs ">
                    {" "}
                    <h6 style={{ fontSize: "14px" }}>My Account ({user.email})</h6>
                  </div>
                </Dropdown.Item>
                <Dropdown.Item  onClick={logoutSet}>
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
              <NavLink activeclassname="active" className="navlinks" to={"/business/dashboard"}>
                <button> Dashboard</button >
              </NavLink>{" "}
            </div>
            <div>
              <NavLink  className="navlinks" to={"/business/users"}>
                <button> User List</button>
              </NavLink>{" "}
            </div>
            <div>
              <NavLink activeclassname="active" className="navlinks" to={"/business/analysis"}>
                <button> Test Analysis</button>
              </NavLink>{" "}
            </div>
            <div>
              <NavLink activeclassname="active" className="navlinks" to={"/business/topup"}>
                <button> Top Up</button>
              </NavLink>{" "}
            </div>
            <div>
              {/*<Link to={"/wallet"}>*/}
              {/*  {" "}*/}
              {/*  Buy Units*/}
              {/*</Link>*/}
              {/*<NavLink activeclassname="active" className="navlinks" to={"/wallet"}>*/}
                <button onClick={openInviteModal} className="ml3 btn-invite"> Invite members</button>
              {/*</NavLink>{" "}*/}
            </div>

          </Offcanvas.Body>
        </Offcanvas>
      </TabletAndBelow>
      <InviteModal />
    </>
  );
};
