const initialState = {
    user: null,
    alert: {
        view: false,
        message: '',
        success: false
    },
}


const usersReducers = (state = initialState, action) => {
    
    switch (action.type) {
        case 'USER':
            return {
                ...state,
               user: action.payload
             }
        case 'MESSAGE':
            return {
                ...state,
                alert: action.payload
            }

        //  case 'SUCCES':
        //      return {
        //          ...state,
        //          success: action.payload
        //      }
             default:
                return state
    }
}
export default usersReducers;
