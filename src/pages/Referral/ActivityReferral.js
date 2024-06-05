import React from "react";
import Icon1 from "../../assets/images/green.svg";
import Icon2 from "../../assets/images/blue.svg";
import moment from "moment/moment";

export const ActivityReferral = ({ data, active }) => {
  const { color } = data;
  return (
    <div className="activity-div flexy">
      <div className="col-md-1">
        <img src={Icon1} alt="icon" />
      </div>
      <div className="" style={{ flexGrow: "1" }}>
        <small>{`${moment(data.updatedAt).format("DD-MM-YYYY")}  `}</small>
        <span style={{ width: "3px" }}>.</span>
        <small>{` ${moment(data.updatedAt).format("MM:SS")}  `}</small>
        <h6 style={{ marginTop: "-10px" }}>{ `${data.name} (${data.email})`}</h6>
        <p>{`${data.amount} unit was added to your wallet`}</p>
      </div>
      <div style={{ marginTop: "20px" }}>
        <h6 style={{color: data.status_cls}}>{`${data.status}`}</h6>
        <p>{`+ ${data.amount} units`}</p>
      </div>
    </div>
  );
};
