import axios from "axios";

const usersActions = {
    signUpUsers: (userData) => {
        return async (dispatch, getState) => {
            try {
                const res = await axios.post(`http://localhost:4000/api/signup`, { userData })
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

        }
    },


    signInUsers: (logedUser) => {
        return async (dispatch, getState) => {
            const res = await axios.post("http://localhost:4000/api/signin", { logedUser })
            console.log(res)
            if (res.data.success) {
                localStorage.setItem('token', res.data.response.token)
                dispatch(
                    { type: "USER", payload: res.data }
                )
            }
            dispatch({
                type: "MESSAGE",
                payload: {
                    view: true,
                    message: res.data.message,
                    success: res.data.success
                }
            })


        }
    },

    // VerificationToken: (token) => {
    //     return async (dispatch, getState) => {
            
    //         const user = await axios.get("http://localhost:4000/api/signintoken", {headers: {'Authorization': 'Bearer '+token}} )
            
    //         if (user.data.success) {
    //             dispatch({
    //                 type: 'USER',
    //                 payload: user.data.response
    //             })
    //             dispatch({
    //                 type: 'MESSAGE',
    //                 payload: {
    //                     view: true,
    //                     message: user.data.message,
    //                     success: user.data.success
    //                 }
    //             })
    //         } else {
    //             localStorage.removeItem('token')
    //         }
    //     }
    // }

}


export default usersActions