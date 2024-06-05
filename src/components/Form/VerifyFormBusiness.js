import "./form.scss";
import React, {useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import {PrimaryButton} from "../button";
import {Link, useNavigate} from "react-router-dom";
import api from "../../api/axios";
import {DEFAULT_ERROR, VERIFY_BUSINESS_EMAIL, VERIFY_EMAIL} from "../../api/urls";
import {Alert} from "react-bootstrap";
import AuthContext from "../../context/AuthProvider";

export const VerifyFormBusiness = () => {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [successMsg, setSuccessMsg] = useState(false);
    let token="";
    const search = window.location.search.split("token=");
    if(search.length > 1){
        token = search[1];
    }


    useEffect(() => {
            handleSubmit();
        // setIsLoading(true);
    },[])



    async function handleSubmit() {
        try {
            setIsLoading(true);
            const response = await api.post(`${VERIFY_BUSINESS_EMAIL}?token=${token}`, { });
            const navUrl = response.data.navUrl || "/";
            authCtx.login(response.data.user,
                response.data.token,
                response.data.roles || []);
            toast.success("Email Verification Successful");
            navigate(navUrl,{ replace: true });
              setIsLoading(false);
        } catch (error) {
            toast.error(error?.response?.data?.error || DEFAULT_ERROR);
            setSuccessMsg(error?.response?.data?.error || DEFAULT_ERROR);
            // setIsLoading(false);
        }
    }


  return (
          <form className="form-container" action="" >
                     <>
                         <Alert show={!!successMsg} variant="danger">
                             <p>
                                 {successMsg}
                             </p>
                         </Alert>
                         {!!successMsg && (<PrimaryButton  to={"/login"}  className="formButtonActive formbutton">Back to Login</PrimaryButton>)}
                     </>

              {!!!successMsg && (<>
              <h6 className="form-heading">
                  Email Verification
              </h6>
              <PrimaryButton isLoadingMsg="Verifying Email Please wait..." size="sm" className="formButtonActive formbutton" isLoading={isLoading}>""</PrimaryButton>
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
