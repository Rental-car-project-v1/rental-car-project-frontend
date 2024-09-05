const convertToQueryParams = (state) => {
    const params = new URLSearchParams(state);
    return params.toString();
}

export default convertToQueryParams