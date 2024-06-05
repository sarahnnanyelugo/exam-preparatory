import React from "react";
import { Link } from "react-router-dom";
import "./menu-link.scss";

function MenuLink({ data, callback }) {
  function fb() {
    // console.log("clickedd!!");
    // document
    //   .getElementsByClassName("menu-dropdown ")[0]
    //   .style.setProperty("display", "");

    document
      .querySelectorAll(".menu-dropdown")
      .forEach((element) => element.classList.add("hidden"));
    document.querySelector(".phone").classList.toggle("active3");

    setTimeout(() => {
      document
        .querySelectorAll(".menu-dropdown")
        .forEach((element) => element.classList.remove("hidden"));
    }, 500);
  }
  return (
    <Link to={data.url} className="menu-link">
      {" "}
      <div className="col-md-12 menu-link-container" onClick={fb}>
        <img className="   " src={data.icon} alt="Scholar" />
        <h6>{data.title}</h6>
        <p>{data.text}</p>
      </div>
    </Link>
  );
}

export default MenuLink;
