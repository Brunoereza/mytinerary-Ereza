import axios from "axios";

const intinerariesActions = {
    getItineraryByCity: (id) => {
        return async (dispatch, getState) => {
            const res = await axios.get(`http://localhost:4000/api/intinerarybycity/${id}`)
            
            dispatch({type: "FIND_INTINERARIES", payload:res.data.res})
        }
    }
}

export default intinerariesActions;