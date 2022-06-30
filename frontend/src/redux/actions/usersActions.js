import axios from "axios";

const usersActions ={
    signUpUsers: (userData)=>{
        return async (dispatch, getState) => {
            try{
            const res = await axios.post(`http://localhost:4000/api/signup`, {userData})
            console.log(res)
            dispatch({
                type: 'MESSAGE',
                payload: {
                    view: true,
                    message: res.data.message,
                    success: res.data.success
                }
            })
           return res
        } catch (error) {
            console.log(error)
        }

    }},

    
    signInUsers: (logedUser) =>{
        return async (dispatch, getState) => {
            const res = await axios.post(`http://localhost:4000/api/signin`, {logedUser})
            console.log(res.data.res)
            
        }
    },

}
export default usersActions