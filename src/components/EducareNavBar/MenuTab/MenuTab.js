import "./_menu-tab.scss";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import { NavLink } from "react-router-dom";
import MenuLink from "../MenuLink/MenuLink";
import CBT2 from "../../../assets/images/computer-setting.svg";
import {
  columeOne,
  columeTwo,
  columeThree,
  columeFour,
  columeFive,
  columeSix,
  columeSeven,
} from "../../../TestData";

export const MenuTab = () => {
  function callbackHandler() {
    // console.log("clicked!");
  }
  return (
    <>
      <div className="col-md-12">
        {" "}
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={2} className="tab-headerss">
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link
                    eventKey="first"
                    className="menu-links list-group-item list-group-item-action drop-down-nav"
                  >
                    All Products
                    <span>
                      <i class="icofont-rounded-right"></i>
                    </span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="second"
                    className="menu-links list-group-item list-group-item-action drop-down-nav"
                  >
                    For Businesses{" "}
                    <span>
                      <i class="icofont-rounded-right"></i>
                    </span>
                  </Nav.Link>
                </Nav.Item>{" "}
                <Nav.Item>
                  <Nav.Link
                    eventKey="third"
                    className="menu-links list-group-item list-group-item-action  drop-down-nav"
                  >
                    For Schools{" "}
                    <span>
                      <i class="icofont-rounded-right"></i>
                    </span>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={10} className="tab-content">
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <div className="col-md-12 flexy ">
                    <div className="col-md-12  row row-cols-2 row-cols-lg-5  g-lg-4 ">
                      {" "}
                      <div className="col">
                        {columeOne.map((data, index) => (
                          <MenuLink data={data} callback={callbackHandler} />
                        ))}
                      </div>{" "}
                      <div className="col-">
                        {columeTwo.map((data, index) => (
                          <MenuLink data={data} callback={callbackHandler} />
                        ))}
                      </div>{" "}
                      <div className="col">
                        {columeThree.map((data, index) => (
                          <MenuLink data={data} callback={callbackHandler} />
                        ))}
                      </div>{" "}
                      <div className="col">
                        {columeFour.map((data, index) => (
                          <MenuLink data={data} callback={callbackHandler} />
                        ))}
                      </div>{" "}
                      <div className="col">
                        {columeFive.map((data, index) => (
                          <MenuLink data={data} callback={callbackHandler} />
                        ))}
                      </div>{" "}
                    </div>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <div className="col-md-12 flexy">
                    <div className="col-md-4 flexy flexyM">
                      <div className="col-md-6 col-6">
                        {columeSix.map((data, index) => (
                          <MenuLink data={data} callback={callbackHandler} />
                        ))}
                      </div>{" "}
                      <div className="col-md-6 col-6">
                        {columeSeven.map((data, index) => (
                          <MenuLink data={data} callback={callbackHandler} />
                        ))}
                      </div>{" "}
                    </div>
                  </div>
                </Tab.Pane>{" "}
                <Tab.Pane eventKey="third">
                  <div className="col-md-12 flexy ">
                    <div className="col-md-4 flexy flexyM">
                      {" "}
                      <div className="col-md-6 col-6">
                        {columeOne.map((data, index) => (
                          <MenuLink data={data} callback={callbackHandler} />
                        ))}
                      </div>{" "}
                      <div className="col-md-6 col-6">
                        {columeTwo.map((data, index) => (
                          <MenuLink data={data} callback={callbackHandler} />
                        ))}
                      </div>{" "}
                    </div>
                    <div className="col-md-4 flexy flexyM">
                      {" "}
                      <div className="col-md-6 col-6">
                        {columeThree.map((data, index) => (
                          <MenuLink data={data} callback={callbackHandler} />
                        ))}
                      </div>{" "}
                      <div className="col-md-6 col-6">
                        {columeFour.map((data, index) => (
                          <MenuLink data={data} callback={callbackHandler} />
                        ))}
                      </div>{" "}
                    </div>

                    <div className="col-md-4 flexy flexyM ">
                      {" "}
                      <div className="col-md-6 col-6">
                        {columeFive.map((data, index) => (
                          <MenuLink data={data} callback={callbackHandler} />
                        ))}
                      </div>
                    </div>
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </>
  );
};
