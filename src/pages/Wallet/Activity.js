import React from "react";
import Icon1 from "../../assets/images/green.svg";
import Icon2 from "../../assets/images/blue.svg";
import moment from "moment/moment";

export const Activity = ({ data, active }) => {
  const { color } = data;
  return (
    <div className="activity-div2 d-flex">
      <div className="col-md-1">
        <img src={active === 1 ? Icon1 : Icon2} alt="icon" />
      </div>
      <div className="col-7 col-md-8" style={{ flexGrow: "1" }}>
        <small>{`${moment(data.createdAt).format("DD-MM-YYYY")}  `}</small>
        <span style={{ width: "3px" }}>.</span>
        <small>{` ${moment(data.createdAt).format("HH:MM")}  `}</small>
        <h6>
          {data.type === "Credit"
            ? "You topped up your wallet"
            : `${data.description}`}
        </h6>
        <p>
          {data.type === "Credit"
            ? `₦${data.amount} unit equivalent was added to your wallet`
            : `You used ${data.amount} units for ${data.description}`}
        </p>
      </div>
      <div style={{ marginTop: "20px" }} className="">
        <h6
          style={{ color: data.type === "Credit" ? "#5EAA42" : "#D52143" }}
        >{`${data.type === "Credit" ? "+" : "-"} ${
          data.new_balance
        } units`}</h6>
        <p>{`${data.type === "Credit" ? "+" : ""} ${data.amount} units`}</p>
      </div>
    </div>
  );
};
