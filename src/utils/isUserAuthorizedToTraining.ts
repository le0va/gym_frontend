import { Role } from "../types";

const isUserAuthorizedToTraining = () => {
    const roles: Role[] = JSON.parse(localStorage.getItem('roles') ?? '[]');

    return roles.includes(Role.user);
}

export default isUserAuthorizedToTraining;