import "./form.scss";
import React, {useContext, useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import {PrimaryButton} from "../button";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import api from "../../api/axios";
import {DEFAULT_ERROR, PASSWORD_RESET, PASSWORD_VERIFY_RESET} from "../../api/urls";
import {Alert, Button} from "react-bootstrap";
import AuthContext from "../../context/AuthProvider";
import Form from 'react-bootstrap/Form';

export const PasswordVerifyForm = ({isChangePassword}) => {
    const authCtx = useContext(AuthContext);
    let token="";
    const search = window.location.search.split("token=");
    if(search.length > 1){
        token = search[1];
    }
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState(false);

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
        // console.log({
        //     ...form,
        //     [e.target.name]: e.target.value,
        // });
    }

    const [form, setForm] = useState({
        old_password: "",
        password: "",
        confirm_password: "",
    });

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setIsLoading(true);
            setSuccessMsg(false);
            const response = await api.post(`${PASSWORD_VERIFY_RESET}?token=${token}`, { password: form.password,confirm_password:form.confirm_password,
            old_password:form.old_password});
            if(!isChangePassword) {
                setSuccessMsg(response.data.success);
                const navUrl = response.data.navUrl || "/";
                authCtx.login(response.data.user, response.data.token,response.data.roles || []);
                toast.success("Password Reset Successful");
                navigate(navUrl,{ replace: true });
            }
            else{
                toast.success(response.data.success);
                setForm({
                    ...form,
                    old_password: "",
                    password: "",
                    confirm_password: "",
                });
            }
              setIsLoading(false);
        } catch (error) {
            toast.error(error?.response?.data?.error || DEFAULT_ERROR);
            if(!isChangePassword) {
                setSuccessMsg(error?.response?.data?.error || DEFAULT_ERROR)
            }
            setIsLoading(false);
        }
    }


  return (
          <form className="form-container" action="" onSubmit={handleSubmit}>
                      <Alert show={!!successMsg} variant="danger">
                          <p>
                              {successMsg}
                          </p>
                      </Alert>

                 <>
              <h6 className="form-heading">
                  {isChangePassword?"Change your password":"Create New Password"}
              </h6>

                     {isChangePassword && ( <Form.Group className="mb-3" >
                         <Form.Label htmlFor="inputPassword5">Old Password</Form.Label>
                         <Form.Control
                             type="password"
                             id="old_password" name="old_password" onChange={handleChange}
                             aria-describedby="passwordHelpBlock"
                         />
                     </Form.Group>)}
                         <Form.Group className="mb-3" >
                             <Form.Label htmlFor="inputPassword5">{isChangePassword && "New "}Password</Form.Label>
                             <Form.Control
                                 type="password"
                                 id="password" name="password" onChange={handleChange}
                                 aria-describedby="passwordHelpBlock"
                             />
                             <Form.Text id="passwordHelpBlock" muted>
                                 Your password must be 8-20 characters long,
                                 and must not contain spaces, special characters, or emoji.
                             </Form.Text>
                         </Form.Group>
                         <Form.Group className="mb-3">
                             <Form.Label htmlFor="inputPassword6">Confirm Password</Form.Label>
                             <Form.Control
                                 type="password"
                                 id="confirm_password"
                                 name="confirm_password" onChange={handleChange}
                                 aria-describedby="passwordHelpBlock"
                             />
                             <Form.Text id="passwordHelpBlock6" muted>
                                 Your password must be 8-20 characters long,and must not contain spaces, special characters, or emoji.
                             </Form.Text>
                         </Form.Group>

                {" "}
              <PrimaryButton isLoadingMsg="Resetting..." size="sm" className="formButtonActive formbutton" isLoading={isLoading}>{isChangePassword?"Change":"Reset"} Password</PrimaryButton>
                     {!isChangePassword && (<center>
                  <p style={{ fontSize: "12px" }}>
                      <Link className="link2" to={"/login"}>
                         Return to login
                      </Link>
                  </p>
              </center>)}
              </>
          </form>
  );
}
