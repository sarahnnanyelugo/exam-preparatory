import React, { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../assets/images/profile.svg";
import PingUser from "./PingUser";
export const CompletedProfile = (props) => {
  return (
    <>
      <div className="profile-div d-flex">
        <div className="d-flex" style={{ flexGrow: 1 }}>
          {" "}
          <img src={Icon} width="23px" />
          <div>
            <h6>{props.user}</h6>
            <small>
              {props.date}. {props.time}
            </small>
          </div>
        </div>

        <div>
          <p className="offset-6">100+</p>

          <Link className="view-btn">View details</Link>
        </div>
      </div>
    </>
  );
};
