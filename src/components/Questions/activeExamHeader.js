import React, {useContext, useEffect, useRef, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import AuthContext from "../../context/AuthProvider";
import Timer from "./Timer";
import "./activeExamHeader.scss"
import Accordion from 'react-bootstrap/Accordion';
import parse from "html-react-parser";
export const ActiveExamHeader = ({ children,stop,timeFinished }) => {
  const examSummary = useSelector((state) => state.exam.meta);
  const { user } = useContext(AuthContext);

  return (
    <>
      <div className="col-md-8 offset-md-2 student-details flexy">
        <div className="col-md-5 ">
          <div className="flexy flexyM name-cls">
            {" "}
            <h6 className="col-md-3 col-3">Students Name:</h6>
            <p style={{ color: "#2F67D8" }}>{user?.name}</p>
          </div>
          <div className="flexy flexyM">
            {" "}
            <h6 className="col-md-3 col-3">Subject:</h6>
            <p style={{ color: "#C32BD6" }}>{examSummary?.subject}</p>
          </div>{" "}
          <div className="flexy flexyM">
            {" "}
            <h6 className="col-md-3 col-3">Test Title:</h6>
            <p>{examSummary?.session}</p>
          </div>
        </div>
        <Timer stop={stop} timeFinished={timeFinished}></Timer>
      </div>
      <div className="col-md-8 offset-md-2 student-details flexy div-acc">
        <Accordion flush>
          <Accordion.Item eventKey="0">
            <Accordion.Header className={"ins-header"}>Test Instructions</Accordion.Header>
            <Accordion.Body className={"over-y"}>
              {parse(examSummary?.instructions)}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
      {children}
    </>
  );
};
