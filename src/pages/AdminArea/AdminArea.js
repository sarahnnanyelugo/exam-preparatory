import React, {useContext, useEffect, useRef, useState} from "react";
import {useMediaQuery} from "react-responsive";
import {Outlet} from "react-router-dom";
import {Navbar} from "../../components/Navbar/Navbar";
import {NavbarAdmin} from "../../components/Navbar/NavbarAdmin";

export const AdminArea = ({handle}) => {

  return (
    <>
      <div><NavbarAdmin /></div>
      <Outlet />
    </>
  );
};
