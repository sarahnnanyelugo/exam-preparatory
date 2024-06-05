import React, {useState} from "react";
import EyeClose from "../../assets/images/eye-close.jpg";
import EyeOpen from "../../assets/images/eye-open.svg";
import {Link} from "react-router-dom";

export const Password = (props) => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        props.onChange(e);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="form-group">
            <div className="form-control-wrap">
                <div className="password-input formpassword ">
                    <input type={showPassword ? "text" : "password"} name={props.name} autoComplete="new-password"
                           required value={password} onChange={handlePasswordChange}/>
                    <label htmlFor="text" className="label-name">
                        <span className="content-name">{props.placeholder}</span>
                    </label>
                    <span onClick={toggleShowPassword}>
        {showPassword ? <img className="" src={EyeClose} alt="Scholar" width="5%"/> :
            <img className="" src={EyeOpen} alt="Scholar" width="4%"/>}
      </span>
                </div>
                {props.isLogin?(
                    <div className="form-label-group">
                        <label className="form-label" htmlFor="password">
                        </label>
                        <Link className="link link-primary link-sm fpassword" to={`/password-reset`}>
                            Forgot Password?
                        </Link>
                    </div>
                ):""}
            </div>
        </div>
    );
};
