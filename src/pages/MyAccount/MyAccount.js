import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import EducareNavBar from "../../components/EducareNavBar/EducareNavBar";
import { Password } from "../../components/Form/Password";
import { Navbar } from "../../components/Navbar/Navbar";
import "./my-account.scss";
import Prev from "../../assets/images/previous.svg";
import AuthContext from "../../context/AuthProvider";
import {PasswordVerifyForm} from "../../components/Form/PasswordVerifyForm";
import {NavbarBusiness} from "../../components/Navbar/NavbarBusiness";
export const MyAccount = ({isBusiness}) => {
  const { user, isLoggedIn } = useContext(AuthContext);
  const [activeIndex2, setActiveIndex2] = useState(1);
  const handleClick = (index) => setActiveIndex2(index);
  const [newPassword, setNewPassword] = useState("hide");
  //   const [unsetPassword, setUnsetPassword] = useState("");

  const [formUser, setFormUser] = useState({
    email: user.email,
    name: user.name,
    country: user.country,
  });
  // console.log(user);
  const checkActive = (index, className) => (activeIndex2 === index ? className : "");
  function changePassword() {
    setNewPassword("show");
  }
  function unsetPassword() {
    setNewPassword("hide");
  }
  function handleChange(e) {
    setFormUser({
      ...formUser,
      [e.target.name]: e.target.value,
    });
  }
  return (
    <>
      <div>{isBusiness ? <NavbarBusiness /> : <Navbar />}</div>

      <div className="col-md-10 offset-md-1 mt7 acc-body">
        <Link to={"/"}>
          {" "}
          <img src={Prev} alt="img" width="44px" height="21px" className="" />
          Back
        </Link>
        <h3 className="mt3">My Account</h3>

          <div className="analysis-tab ">
          <div className="tabs ">
            <button className={`tab ${checkActive(1, "active2")}`} onClick={() => handleClick(1)}>
              My profile
            </button>
            {
              <button
              className={`tab ${checkActive(2, "active2")}`}
              onClick={() => handleClick(2)}
              style={{ marginLeft: "20px" }}
            >
             Change Password
            </button>
            }
          </div>

            {activeIndex2 === 1 && (
          <div className="acc-card">
            <h6>Personal Information</h6>
            <hr />

            <form className=" flexy ">
              <div className="col-md-4">
                <div className="form">
                  <p><b>Name: </b> {formUser.name}</p>
                  {/*<input*/}
                  {/*  type="text"*/}
                  {/*  name="first_name"*/}
                  {/*  readOnly={true}*/}
                  {/*  value={formUser.name}*/}
                  {/*/>*/}
                  {/*<label  className="">*/}
                  {/*  <span className="content-name">First Name</span>*/}
                  {/*</label>*/}
                </div>{" "}
                <div className="form">
                  <p><b>Email: </b>{formUser.email}</p>
                  {/*<input readOnly={true}*/}
                  {/*  type="email"*/}
                  {/*  name="email"*/}
                  {/*       value={formUser.email}*/}
                  {/*       readOnly={true}*/}
                  {/*  //   onChange={handleChange}*/}
                  {/*/>*/}
                  {/*<label >*/}
                  {/*  <span className="content-name"></span>*/}
                  {/*</label>*/}
                </div>{" "}
              </div>
              <div className="col-md-4 lst-input">
                {" "}
                <div className="form">
                  <p><b>Country:  </b>{formUser.country}</p>
                  {/*<input*/}
                  {/*  type="text"*/}
                  {/*  name="last_name"*/}
                  {/*  value={formUser.country}*/}
                  {/*  readOnly={true}*/}
                  {/*/>*/}
                  {/*<label htmlFor="text" className="label-name">*/}
                  {/*  <span className="content-name">Last Name</span>*/}
                  {/*</label>*/}
                </div>{" "}
              </div>
            </form>
          </div>
            )}
            {activeIndex2 === 2 && (
          <div className="acc-card ">
            <div className="flexyc">
              {" "}
              <PasswordVerifyForm isChangePassword={true} />
            </div>
          </div>
            )}
        </div>

      </div>
    </>
  );
}
