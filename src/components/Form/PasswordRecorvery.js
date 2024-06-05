import "./form.scss";
import React, { useState } from "react";
import {toast, ToastContainer} from "react-toastify";
import logo from "../../assets/images/main.png";
import {Password} from "./Password";
import {PrimaryButton} from "../button";
import {GoogleButton} from "../GoogleButton/GoogleButton";
import {Link} from "react-router-dom";
import api from "../../api/axios";
import {DEFAULT_ERROR, PASSWORD_RESET} from "../../api/urls";
import {Alert, Button} from "react-bootstrap";

export const RecoveryPassword = () => {
  const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState(false);

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    const [form, setForm] = useState({
        email: "",
    });

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setIsLoading(true);
            const response = await api.post(PASSWORD_RESET, { email: form.email});
            setSuccessMsg(response.data.success);
              setIsLoading(false);
        } catch (error) {
            toast.error(error?.response?.data?.error || DEFAULT_ERROR);
            setIsLoading(false);
        }
    }


  return (
          <form className="form-container" action="" onSubmit={handleSubmit}>
              {successMsg?(
                        <><Alert show={!!successMsg} variant="light">
                            <Alert.Heading>Email Sent</Alert.Heading>
                            <p>
                                {successMsg}
                            </p>
                        </Alert>
                            <PrimaryButton  to={"/login"}  className="formButtonActive formbutton">Back to Login</PrimaryButton>
                        </>
                  ):
                  (<>
              <h6 className="form-heading">
                  Reset password
              </h6>
              <p>
                  If you forgot your password, we’ll email you instructions to reset your password.
              </p>
              <div className="form">
                  <input placeholder="Enter your email address" type="email" name="email" onChange={handleChange} />
                  <label htmlFor="text" className="label-name">
                      <span className="content-name">Email *</span>
                  </label>
              </div>{" "}
              <PrimaryButton isLoadingMsg="sending..." size="sm" className="formButtonActive formbutton" isLoading={isLoading}>Send Reset Link</PrimaryButton>
              <center>
                  <p style={{ fontSize: "12px" }}>
                      <Link className="link2" to={"/login"}>
                         Return to login
                      </Link>
                  </p>
              </center>
              </>)}
          </form>
  );
}
