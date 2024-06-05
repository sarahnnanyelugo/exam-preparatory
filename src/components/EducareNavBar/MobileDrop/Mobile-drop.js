import React, { useState } from "react";
import "./mobile-drop.scss";
import Accordion from "react-bootstrap/Accordion";
import { Link } from "react-router-dom";

export const MobileDrop = () => {
  return (
    <div className="mobile-drop-container">
      {" "}
      <Accordion defaultActiveKey="">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <p>Solutions</p>
          </Accordion.Header>
          <Accordion.Body>
            <div className="col-md-10 offset-md-1">
              {" "}
              <p>
                ur Onboarding Experts have extensive experience working with
                numerous businesses worldwide. They are available to assist you
                with setting up your dashboard
              </p>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};
