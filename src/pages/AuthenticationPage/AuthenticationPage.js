import React from "react";
import SignUpForm from "../../components/Form/SignUpForm";
import "./auth.scss";
export const AuthenticationPage = ({isInvite}) => {
  return (
    <>
      <div className="col-md-4 offset-md-4 auth-page">
        <div className="col-md-8 offset-md-2">
          {" "}
          <SignUpForm isInvite={isInvite} />
        </div>
      </div>
    </>
  );
};
