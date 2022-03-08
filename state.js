const reducer = (state=[], actions) => {
    const {type, payload} = actions;

    if(type === 'PASS_DATA') {
        return state = payload
    }
    if(type === 'NEW_DATA') {
        return state = [...state, payload]
    }

    return state;
}

export default reducer;