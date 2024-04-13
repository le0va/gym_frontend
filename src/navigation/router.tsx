import { Navigate, createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AccountSettings from "../pages/account-settings";
import Auth from "../pages/auth";
import TrainingUsers from "../pages/training-users";
import TrainingsHistory from "../pages/trainings-history";
import App from "../App";
import accountSettingsStore from "../store/accountSettings.store";
import Error from "../pages/error";
import trainingUsersStore from "../store/trainingUsers.store";
import usersService from "../services/users.service";
import trainingsStore from "../store/trainings.store";
import authService from "../services/auth.service";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Navigate to="/training-users" />
            },
            {
                path: "/training-users",
                element: <TrainingUsers store={trainingUsersStore} service={usersService} />
            },
            {
                path: "/trainings-history",
                element: <TrainingsHistory store={trainingsStore} />
            },
            {
                path: "/account-settings",
                element:
                    <ProtectedRoute>
                        <AccountSettings store={accountSettingsStore} />
                    </ProtectedRoute>
            },
            {
                path: "/login",
                element: <Auth service={authService} />
            }
        ]
    },
])


export default router;