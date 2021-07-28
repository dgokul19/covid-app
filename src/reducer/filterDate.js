let initialState = {
    filterDate : null,
    setFilter : false
};
const covidCasesreducer = (state = initialState, action) => {

    switch (action.type) {
        case 'SET_FILTER_DATE' : 
            return {...state, filterDate : action.payload};
        case 'ENABLE_FILTER' : 
            return {...state, setFilter : action.payload};
        
        default:
            return state;
    }
}

export default covidCasesreducer;