const isUserAuthorized = () => {
    return localStorage.getItem('accessToken') !== null &&
        localStorage.getItem('accessToken') !== undefined &&
        localStorage.getItem('userId') !== null &&
        localStorage.getItem('userId') !== undefined ? true : false;
}

export default isUserAuthorized;