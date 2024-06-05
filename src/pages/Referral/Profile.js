import React from "react";
import Icon from "../../assets/images/profile.svg";
import PingUser from "./PingUser";
export const Profile = (props) => {
  return (
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
      <div className="d-flex">
        <button className="pend-btn">Pending</button>
        <div>
          <p className="offset-6">100+</p>

          <PingUser />
        </div>
      </div>
    </div>
  );
};
