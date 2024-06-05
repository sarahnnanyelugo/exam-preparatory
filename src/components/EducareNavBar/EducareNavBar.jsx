import React, { useEffect, useState, useRef } from "react";
import Logo from "../../assets/images/logo.png";
import Arrow from "../../assets/images/arrowdown.svg";
import { Link, NavLink } from "react-router-dom";
import "./_educare-navbar.scss";
import { useLocation } from "react-router-dom";
// import Icofont from "react-icofont";
import { MenuTab } from "./MenuTab/MenuTab";
import { MobileDrop } from "./MobileDrop/Mobile-drop";
import Accordion from "react-bootstrap/Accordion";
import Img1 from "../../assets/images/school.svg";
import Img2 from "../../assets/images/logistics.svg";
import Img3 from "../../assets/images/retail.svg";
import Img4 from "../../assets/images/construction.svg";
import Img5 from "../../assets/images/energy.svg";
import Img6 from "../../assets/images/health.svg";
import Img7 from "../../assets/images/support2.svg";
import Img8 from "../../assets/images/guides.svg";
import Img9 from "../../assets/images/blog.svg";
import Img10 from "../../assets/images/partner.svg";
import Img11 from "../../assets/images/contact.svg";
import Img12 from "../../assets/images/careers.svg";
import Img13 from "../../assets/images/manufacturing.svg";
import Img14 from "../../assets/images/services.svg";
import Img15 from "../../assets/images/consulting.svg";
import Img16 from "../../assets/images/government.svg";
import Img17 from "../../assets/images/abt-us.svg";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

function EducareNavBar({ isPartner }) {
  const prevUrlRef = useRef(null);
  const [stick, setStick] = useState(true);
  const [themeSet, setTheme] = useState("");
  const [themeSet2, setTheme2] = useState("");
  const [themeSet3, setTheme3] = useState("");
  const location = useLocation();
  const [showNav, setShowNav] = useState(true);
  const accesstoken = sessionStorage.getItem("accesstoken");
  // console.log(isPartner);

  function SwitchTheme(theme) {
    switch (location.pathname) {
      case "/":
        setTheme("#2f99da");
        // setTheme2("#CEF0FE");
        break;
      default:
      case "/educare-business":
        setTheme("#2F99DA");
        // setTheme2("#CEF0FE");
        break;
      case "/educare-schools":
        setTheme("#2f99da");
        // setTheme2("#CEF0FE");
        break;
      case "/pastoral":
        setTheme("#ED2F59");
        // setTheme2("#FCE0DD");
        break;
      case "/medicals":
        setTheme("#0B2FF7");
        // setTheme2("#8CA8F7");
        break;
      case "/e-classroom":
        // setTheme2("#671F37");
        setTheme("#CC006E");
        break;
      case "/educare-school-packages":
        setTheme("#0098DA");
        // setTheme2("#CEF0FE");
        break;
      case "/sign-up":
        setTheme("#2F99DA");
        // setTheme2("#ffffff");
        break;
      case "/login":
        setTheme("#1777F2");
        // setTheme2("#ffffff");
        break;
      case "/finance":
        setTheme("#4A13B2");
        // setTheme2("#DED0FA");
        break;
      case "/mail-box":
        setTheme("#C32BD6");
        setTheme2("#F5DCF8");
        break;
      case "/voting-system":
        setTheme("#0098DA");
        setTheme2("#CEF0FF");
        break;
      case "/contact-us":
        setTheme("#0098DA");
        setTheme2("#CEF0FF");
        setTheme3("#E7E7E7");
        break;
      case "/hrm":
        setTheme("#EA8713");
        // setTheme2("#E4D5F5");
        // setTheme3("#E7E7E7");
        break;
      case "solutions":
        setTheme("#0098DA");
        setTheme2("#CEF0FF");
        break;
      case "/resources":
        setTheme("#0098DA");
        // setTheme2("#CEF0FF");
        break;
      case "/support":
        setTheme("#0098DA");
        // setTheme2("#CEF0FF");

        break;
      case "/lesson-planner":
        setTheme("#11A377");
        // setTheme2("#FCEBCE");

        break;
      case "/library":
        setTheme("#ED2F59");
        // setTheme2("#FCDCE3");

        break;
      case "/timetable":
        setTheme("#4A13B2");
        // setTheme2("#E7E0F4");

        break;
      case "/weekly-remarks":
        setTheme("#C32BD6");
        // setTheme2("#E5A8E0");

        break;
      case "/cbt":
        setTheme("#11A377");
        // setTheme2("#E0F3ED");

        break;

      case "/wallet-manager":
        setTheme("#11A377");
        // setTheme2("#D9F0E9");

        break;
      case "/facility-manager":
        setTheme("#0B2FF7");
        // setTheme2("#FEF5F7");
        break;
      case "/daily-reporting":
        setTheme("#ED2F59");
        break;
      case "/clubs":
        setTheme("#EA8B1F");
        break;
      case "/dashboards":
        setTheme("#0098DA");

        break;
    }
  }

  useEffect(() => {
    SwitchTheme("#2f99da");
  }, []);
  useEffect(() => {
    SwitchTheme("#2f99da");
  }, [location.pathname]);

  useEffect(() => {
    const currentUrl = window.location.pathname;
    if (prevUrlRef.current !== currentUrl) {
      prevUrlRef.current = currentUrl;
      // console.log(currentUrl);
      setTimeout(() => {
        switch (currentUrl) {
          case "/login":
            setShowNav(false);
            break;
          case "/sign-up":
            setShowNav(false);
            break;
          default:
            setShowNav(true);
            break;
        }
        localStorage.setItem("showNav", showNav);
      }, 200);
    }
  });

  //   const currentUrl = window.location.pathname;

  //   if (prevUrlRef.current !== currentUrl) {
  //     prevUrlRef.current = currentUrl;
  //     console.log(currentUrl);
  //     setTimeout(() => {
  //       switch (currentUrl) {
  //         case "/":
  //           setStick(true);
  //           break;

  //         default:
  //           setStick(false);
  //           break;
  //       }
  //       console.log(showNav);
  //     }, 200);
  //   }
  // });

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary fixed-nav fixed-top">
        <Container
          fluid
          className={`navbar-container offset-lg-1 col-lg-10 col-md-12 ${
            showNav ? "" : "hide"
          } ${stick ? "" : "sticky"}`}
          id="nav"
        >
          <Navbar.Brand href="#">
            <div className="logo-holder  " style={{ flexGrow: 1 }}>
              {" "}
              <Link to={"/"}>
                {" "}
                <img className="logo" src={Logo} alt="Scholar" />
              </Link>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>
            <div className="nav-buttons ">
              <div className="col-md-12 offset-md-">
                <NavLink to={"/partnership"} activeClassName="active">
                  Become a Partner
                </NavLink>{" "}
                <NavLink to={"/resources"} activeClassName="active">
                  Resources
                </NavLink>
                <NavLink to={"/buy-voucher"} activeClassName="active">
                  Buy Voucher
                </NavLink>
                <Link to={"/login"}>
                  <button className="sign-in-button">Log in</button>
                </Link>
                {!!!isPartner ? (
                  <>
                    <Link to={"/authenticate"}>
                      <button
                        className="get-started-button"
                        style={{ backgroundColor: "" + themeSet }}
                      >
                        Sign up
                      </button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to={"/authenticate-business"}>
                      <button
                        className="get-started-button"
                        style={{ backgroundColor: "" + themeSet }}
                      >
                        Sign up
                      </button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default EducareNavBar;
