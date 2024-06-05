import {Outlet} from "react-router-dom";
import {NavbarBusiness} from "../../components/Navbar/NavbarBusiness";

export const BusinessArea = ({handle}) => {

  return (
    <>
      <div><NavbarBusiness /></div>
      <Outlet />
    </>
  );
};
