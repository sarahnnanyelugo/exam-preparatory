import "./google-button.scss";
import { GoogleLogin } from "@react-oauth/google";
import api from "../../api/axios";
import { DEFAULT_ERROR, VERIFY_GOOGLE_USER } from "../../api/urls";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

export const GoogleButton = ({ title, isBusiness, inviteCode, bCode }) => {
  if (!title) title = "signin_with";
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const useDesktopMediaQuery = () =>
    useMediaQuery({ query: "(min-width: 769px)" });

  const useTabletAndBelowMediaQuery = () =>
    useMediaQuery({ query: "(max-width: 768px)" });

  const Desktop = ({ children }) => {
    const isDesktop = useDesktopMediaQuery();

    return isDesktop ? children : null;
  };

  const TabletAndBelow = ({ children }) => {
    const isTabletAndBelow = useTabletAndBelowMediaQuery();

    return isTabletAndBelow ? children : null;
  };

  const responseMessage = async (response) => {
    response.isBusinessSignUp = isBusiness;
    response.bCode = bCode;
    response.inviteCode = inviteCode;
    try {
      const res = await api.post(VERIFY_GOOGLE_USER, { data: response });
      if (res.status === 200) {
        const navUrl = res.data.navUrl || "/";
        login(res.data.user, res.data.token, res.data.roles || []);
        if (res.data.msg) {
          toast.info(res.data.msg);
        }
        navigate(navUrl);
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
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
      <TabletAndBelow>
        <GoogleLogin
          shape={"circle"}
          text={title}
          logo_alignment={"center"}
          theme={"outline"}
          width={"250px"}
          onSuccess={responseMessage}
          onError={getErrorMessage}
        />
      </TabletAndBelow>
      <Desktop>
        <GoogleLogin
          shape={"circle"}
          text={title}
          theme={"outline"}
          logo_alignment={"center"}
          onSuccess={responseMessage}
          onError={getErrorMessage}
        />
      </Desktop>
    </>
  );
};
