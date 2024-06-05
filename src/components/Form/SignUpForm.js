import React, { useContext, useEffect, useState } from "react";
import "./form.scss";
import { Password } from "./Password";
import { Link, useNavigate } from "react-router-dom";
import { GoogleButton } from "../GoogleButton/GoogleButton";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import useApi from "../../hooks/useApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DEFAULT_ERROR, REGISTER_URL } from "../../api/urls";
import { PrimaryButton } from "../button";
import AuthContext from "../../context/AuthProvider";
import logo from "../../assets/images/main.png";
import { useParams } from "react-router";

function SignUpForm(props) {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, []);
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");
  const api = useApi();
  const { id } = useParams();
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: " ",
    password: " ",
    phoneNumber: "",
    confirmpassword: "",
  });
  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }
  const handlePhoneChange = (value) => {
    setForm({
      ...form,
      ["phoneNumber"]: value,
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!form?.email) {
      toast.error("email is required");
    } else if (!form?.password) {
      toast.error("password is required");
    } else if (form.password.length < 4) {
      toast.error("password must be more than 4 characters");
    } else if (form.password.length > 10) {
      toast.error("password must be less than 10 characters");
    } else if (form.password !== form.confirmpassword) {
      toast.error("password mismatch");
    } else if (!regex.test(form?.email)) {
      toast.error("This is not a valid email");
    } else if (!form.firstname) {
      toast.error("firstname is required");
    } else if (!form.lastname) {
      toast.error("lastname is required");
    } else {
      setIsLoading(true);
      await createYourAccount();
    }
  }

  const handleChecked = (event) => {
    setIsChecked(event.target.checked);
  };

  const createYourAccount = async () => {
    try {
      const payload = {
        firstname: form.firstname,
        lastname: form.lastname,
        phoneNumber: form.phoneNumber,
        email: form.email,
        password: form.password,
      };
      if (props.isInvite) {
        payload.inviteCode = id;
      }
      await api.post(REGISTER_URL, payload);
      toast.success(
        "Your account has been created. Kindly verify your email to access your account"
      );
      setIsLoading(false);
      navigate("/login/");
    } catch (error) {
      toast.error(getErrorMessage(error));
      setIsLoading(false);
    }
  };
  const getErrorMessage = (error) => {
    let msg =
      (error.response.status === 403 && error?.response?.data) ||
      error.response.statusText;
    if (
      error.response.data &&
      typeof error.response.data === "object" &&
      error.response.data.error
    ) {
      msg = error.response.data.error;
    }
    return (error.response.status !== 404 && msg) || DEFAULT_ERROR;
  };
  return (
    <>
      <ToastContainer />
      <center className="logo-mar-btm">
        <a href="/">
          <img width="60" height="60" src={logo} />
        </a>
      </center>
      <form className=" form-container" action="" onSubmit={handleSubmit}>
        <h6 className="form-heading">
          Create an account <br />
          to continue
        </h6>{" "}
        {/*<center>*/}
        {/*  <small>Signup using</small>*/}
        {/*</center>*/}
        <GoogleButton inviteCode={id} title={"signup_with"} />
        <div className="or flexy flexyM">
          <div className="col-md-5 bodda col-5"></div>
          <div className="col-md-2 col-2">
            <center>
              {" "}
              <p style={{ fontSize: "14px" }}>Or</p>
            </center>
          </div>
          <div className="col-md-5 bodda col-5"></div>
        </div>
        <div className="form">
          <input type="text" name="firstname" onChange={handleChange} />
          <label htmlFor="text" className="label-name">
            <span className="content-name">First Name *</span>
          </label>
        </div>
        <div className="form">
          <input type="text" name="lastname" onChange={handleChange} />
          <label htmlFor="text" className="label-name">
            <span className="content-name">Last Name *</span>
          </label>
        </div>
        <div className="form">
          <input type="email" name="email" onChange={handleChange} />
          <label htmlFor="text" className="label-name">
            <span className="content-name">Email *</span>
          </label>
        </div>{" "}
        <div className="form">
          <PhoneInput
            placeholder="Phone number *"
            value={value}
            onChange={handlePhoneChange}
            country={"ng"}
          />
        </div>{" "}
        <Password
          placeholder="Password"
          onChange={handleChange}
          name="password"
          type="password"
        />
        <Password
          placeholder="Confirm Password *"
          onChange={handleChange}
          name="confirmpassword"
          type="password"
        />
        <span
          style={{
            fontFamily: " rebondG-Medium",
            color: "black",
            fontSize: "10px",
            marginTop: "20px",
          }}
        >
          <input
            type="checkbox"
            onChange={handleChecked}
            style={{ marginRight: "5px" }}
          />
          I agree to the{" "}
          <strong>
            <Link
              target={"_blank"}
              to={"https://www.educare.school/terms"}
              className="link"
            >
              Terms of Service
            </Link>
          </strong>{" "}
          and
          <strong>
            {" "}
            <Link
              target={"_blank"}
              to={"https://www.educare.school/privacy"}
              className="link"
            >
              Privacy Policy
            </Link>
            .
          </strong>
        </span>
        {/*<button*/}
        {/*  disabled={!isChecked}*/}
        {/*  className={}*/}
        {/*>*/}
        {/*  Continue*/}
        {/*</button>*/}
        <PrimaryButton
          disabled={!isChecked}
          isLoadingMsg="please wait..."
          size="sm"
          className={`${
            isChecked
              ? "formButtonActive formbutton mb-5"
              : "formButtonInactive formbutton"
          }`}
          isLoading={isLoading}
        >
          Continue
        </PrimaryButton>
        <center>
          <small style={{ fontSize: "12px" }}>
            Already have an account?{" "}
            <Link className="link2" to={"/login"}>
              Login here
            </Link>
          </small>
        </center>
      </form>
    </>
  );
}

export default SignUpForm;
