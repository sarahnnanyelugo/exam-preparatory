import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../assets/images/blue.svg";
import PingUser from "./PingUser";
export const ExamHistory = (props) => {
  const { colo } = props;
  return (
    <>
      <div className="profile-div2 d-flex">
        <div className="d-flex" style={{ flexGrow: 1 }}>
          {" "}
          <img src={Icon} />
          <div>
            <small>
              {props.date}. {props.time}
            </small>
            <h6>{props.user}</h6>
            <small>
              You used {props.unitAmount} units for {props.exam}
              {""} question
            </small>
          </div>
        </div>

        <div>
          <h6 className="offset-md-6 score offset-4" style={{ color: colo }}>
            {props.score}
          </h6>

          <Link className="view-btn" to={"/analysis-dashboard/${test.action}"}>
            Analyze test
          </Link>
        </div>
      </div>
    </>
  );
};
