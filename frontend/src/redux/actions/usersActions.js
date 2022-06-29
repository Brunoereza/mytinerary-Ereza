import axios from "axios";

const usersActions ={
    signUpUsers: (userData)=>{
        return async (dispatch, getState) => {
            const res = await axios.post(`http://localhost:4000/api/signup`, {userData})
            console.log(res)
        }
    },
    signInUsers: (logedUser) =>{
        return async (dispatch, getState) => {
            const res = await axios.post(`http://localhost:4000/api/signin`, {logedUser})
            console.log(res.data.res)
        }
    },

}
export default usersActions