import { useContext, useState } from "react";
import "./form.scss";
import { Password } from "./Password";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import { GoogleButton } from "../GoogleButton/GoogleButton";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../api/axios";
import AuthContext from "../../context/AuthProvider";
import {DEFAULT_ERROR, LOGIN_URL} from "../../api/urls";
import {PrimaryButton} from "../button";
function LoginForm(props) {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const invite =  searchParams.get("invite");
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
      inviteCode: invite,
  });
  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
        setIsLoading(true);
      const response = await api.post(LOGIN_URL,
          { email: form.email, password: form.password,
              inviteCode: form.inviteCode });
      const user = response.data.user;
      const token = response.data.token;
      const roles = response.data.roles || [];
      const navUrl = response.data.navUrl || "/";
      authCtx.login(user, token,roles);
      if(response.data.msg){
          toast.info(response.data.msg);
      }
      navigate(navUrl,{replace: true});
      setIsLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.error || DEFAULT_ERROR);
        setIsLoading(false);
    }
  }

  const handleChecked = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
       <form className=" form-container" action="" onSubmit={handleSubmit}>
         <h6 className="form-heading">
          Log in to access <br />
          your account
        </h6>
           <div className="google-cls">
               <GoogleButton bCode={invite} />
           </div>
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
          <input type="email" name="email" onChange={handleChange} />
          <label htmlFor="text" className="label-name">
            <span className="content-name">Email *</span>
          </label>
        </div>{" "}
        <Password
          placeholder="Password"
          onChange={handleChange}
          name="password"
          type="password"
          isLogin={true}
        />
           <PrimaryButton isLoadingMsg="Logging in..." size="sm" className="formButtonActive formbutton mb-4" isLoading={isLoading}>Continue</PrimaryButton>


        <center>
          <small style={{ fontSize: "12px" }}>
            Dont have an account?{" "}
            <Link className="link2" to={"/authenticate"}>
              Signup here
            </Link>
          </small>
        </center>
      </form>
  );
}

export default LoginForm;
