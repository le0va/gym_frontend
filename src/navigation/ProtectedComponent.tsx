import { useLocation, Link } from "react-router-dom"

interface ProtectedComponentProps {
    children: JSX.Element;
    condition: boolean;
    redirectTo?: string;
}

const ProtectedComponent = ({ children, condition, redirectTo = '/login' }: ProtectedComponentProps) => {
    const location = useLocation();

    return condition ? children : <Link to={redirectTo} state={{ from: location.pathname }} >{children}</Link>;
}

export default ProtectedComponent;