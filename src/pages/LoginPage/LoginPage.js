import React, {useContext, useEffect} from "react";
import LoginForm from "../../components/Form/LoginForm";
import "./auth.scss";
import {RecoveryPassword} from "../../components/Form/PasswordRecorvery";
import {ToastContainer} from "react-toastify";
import logo from "../../assets/images/main.png";
import {VerifyForm} from "../../components/Form/VerifyForm";
import {PasswordVerifyForm} from "../../components/Form/PasswordVerifyForm";
import {VoucherPurchaseForm} from "../../components/Form/VoucherPurchaseForm";
import {useNavigate} from 'react-router-dom';
import AuthContext from "../../context/AuthProvider";
import {VerifyFormBusiness} from "../../components/Form/VerifyFormBusiness";
import {InviteFormBusiness} from "../../components/Form/InviteFormBusiness";
export const AuthPage = (props) => {
    const { isLoggedIn} = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        if(isLoggedIn) {
            navigate("/");
        }
    }, []);
  return (
    <>
        <div className="col-md-4 offset-md-4 auth-page">
        <div className="col-md-8 offset-md-2">
            <ToastContainer />
            <center className="logo-mar-btm">
                <a href="/">
                    <img  width="60" height="60"  src={logo}/></a>
            </center>
            {(props.isLoggin && <LoginForm />) ||
            (props.isVerify && <VerifyForm />) ||
            (props.isVerifyBusiness && <VerifyFormBusiness />) ||
            (props.isInviteBusiness && <InviteFormBusiness />) ||
            (props.isPassword && <PasswordVerifyForm />) ||
            (props.isVoucher && <VoucherPurchaseForm />) ||
            (<RecoveryPassword />)
            }
        </div>
      </div>
    </>
  );
};
