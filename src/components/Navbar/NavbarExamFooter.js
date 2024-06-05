import "./navbar.scss";
import React from "react";

export const NavbarExamFooter = ({children}) => {

  return (
    <>
      <div className={`nav-container-exam-footer`}>
          {children}
      </div>
    </>
  );
};
