import { useLocation, Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {AdminArea} from "../../pages/AdminArea/AdminArea";
import {BusinessArea} from "../../pages/BusinessArea/BusinessArea";


const RequireAuth = ({ allowedRoles,isBusiness }) => {
    const { roles,isLoggedIn } = useAuth();
    const location = useLocation();
    // console.log(roles);
    return (
        (roles && roles?.find(role => allowedRoles?.includes(role)))
            ? (isBusiness?<BusinessArea />:<AdminArea />)
            : isLoggedIn
            ? <Navigate to="/unauthorized" state={{ from: location }} replace />
            : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;
