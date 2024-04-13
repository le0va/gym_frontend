const isUserTraining = () => {
    const isUserTraining = localStorage.getItem('isUserTraining');
    const result = isUserTraining && isUserTraining === 'true' ? true : false;

    return result
}

export default isUserTraining;