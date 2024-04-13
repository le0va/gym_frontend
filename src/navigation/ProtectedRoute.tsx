import { useLocation, Navigate } from "react-router-dom"
import isUserAuthorized from "../utils/isUserAuthorized";

interface ProtectedRouteProps {
    children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const location = useLocation();

    return isUserAuthorized() ? children : <Navigate to='/login' state={{ from: location.pathname }} />;
}

export default ProtectedRoute;