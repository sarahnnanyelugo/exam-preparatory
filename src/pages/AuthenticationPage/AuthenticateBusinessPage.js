import React from "react";
import "./auth.scss";
import SignUpForBusinessForm from "../../components/Form/SignUpForBusinessForm";
export const AuthenticateBusinessPage = () => {
  return (
    <>
      <div className="col-md-4 offset-md-4 auth-page">
        <div className="col-md-8 offset-md-2">
          {" "}
          <SignUpForBusinessForm />
        </div>
      </div>
    </>
  );
};
