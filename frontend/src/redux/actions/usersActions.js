import axios from "axios";
// import apiUrl from "../../../url"

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
            const res = await axios.post("http://localhost:4000/api/signin", { logedUser })//se le pasa por body
            
            if (res.data.success) {
                localStorage.setItem('token', res.data.response.token)
                dispatch(
                    { type: "USER", payload: res.data.response.userData }
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


    SignOut: (email) => {

        return async (dispatch, getState) => {
            await axios.post('http://localhost:4000/api/signout',{email})
            localStorage.removeItem('token')
            dispatch({
                type: 'USER',
                payload: null
            })
        }
    },

        VerificationToken: (token) => {

            return async (dispatch, getState) => {
    
                await axios.get('http://localhost:4000/api/signintoken', {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                    .then(user => {
                       
                        if (user.data.success) {
                            dispatch({ type: 'user', payload: user.data.response });
                            dispatch({
                                type: 'message',
                                payload: {
                                    view: true,
                                    message: user.data.message,
                                    success: user.data.success
                                }
                            });
                        } else {
                            localStorage.removeItem('token')
                        }
                    }
                    ).catch(error => {
                        // console.log(error.response.status)
                        if (error.response.status === 401)
                            dispatch({
                                type: 'message',
                                payload: {
                                    view: true,
                                    message: "Please make your signIn again",
                                    success: false
                                }
                            })
                        localStorage.removeItem('token')
                    })
            }
        }

}


export default usersActions