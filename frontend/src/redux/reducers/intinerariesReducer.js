const initialState = {
    intineraries: []
}

const intinerariesReducer = (state=initialState, action) => {
    switch (action.type){
        case "FIND_INTINERARIES":
            return{
                ...state,
                intineraries: action.payload
            }
            default:
                return state
    }
}

export default intinerariesReducer;