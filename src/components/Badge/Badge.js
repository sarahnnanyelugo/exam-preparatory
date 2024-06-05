import React from "react";
import "./badge.scss";
export const Badge = ({ cls, text,handleSelected }) => {
  return <button onClick={handleSelected} className={` badge ${cls}`}>{text}</button>;
};
