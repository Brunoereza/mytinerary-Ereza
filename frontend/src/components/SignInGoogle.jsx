import React, { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import usersActions from '../redux/actions/usersActions'
import { useNavigate } from 'react-router-dom';

export default function GoogleSignIn() {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    async function handleCallbackResponse(response) {
        console.log(response.credential);
        let userObject = jwt_decode(response.credential);
        console.log(userObject);
        await dispatch(usersActions.signInUsers({
            firstName: userObject.given_name,
            lastName: userObject.family_name,
            email: userObject.email,
            country: "Argentina",
            imgProfile: userObject.picture,
            password: userObject.sub,
            // role: 'user', 
            from: 'google'
        }
        ))
        const token = localStorage.getItem('token')//recupero el token de local store si esta seteado
        if (token) {// si esta el token lo redirecciono al Navigate
            console.log('navigate')
            navigate("/")
          }
    }

//    const token = localStorage.getItem('token')//recupero el token de local store si esta seteado
//         if (token) {// si esta el token lo redirecciono al Navigate
//             console.log('navigate')
//             navigate("/")
//           }
//     }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: '613504900859-i5d9rnj6gskrsoik0vv6khlk7gof7v2n.apps.googleusercontent.com',
            callback: handleCallbackResponse
        });

        google.accounts.id.renderButton(
            document.getElementById('buttonDiv'),
            { theme: "filled_black", size: "medium", locale: 'en' }
        )
    });

    return (
        <div>
            <div id='buttonDiv'></div>
        </div>
    )
}


// import React, { useEffect } from 'react';
// import jwt_decode from 'jwt-decode';
// import { useDispatch } from 'react-redux';
// import userActions from '../redux/actions/actions/userActions'
// import { useNavigate } from 'react-router-dom';


// export default function GoogleSignIn() {
//     const dispatch = useDispatch();
//     const navigate = useNavigate()


//     async function handleCallbackResponse(response) {
//         console.log(response.credential);
//         let userObject = jwt_decode(response.credential);
//         console.log(userObject);
//         await dispatch(userActions.signInUser({
//             mail: userObject.email, 
//             password: userObject.sub, 
//             from: 'google'
//         })) 
//         const token = localStorage.getItem('token')//recupero el token de local store si esta seteado
//         if (token) {// si esta el token lo redirecciono al Navigate
//             console.log('navigate')
//             navigate("/")
//           }
//     }

//     useEffect(() => {
//         /* global google */
//         google.accounts.id.initialize({
//             client_id:'919064980123-bqimvqbajg07bq9n3png7m74pij1ah9q.apps.googleusercontent.com',
//             callback: handleCallbackResponse
//         });

//         google.accounts.id.renderButton(
//             document.getElementById('buttonDiv'),
//             { theme: "outline", size: "medium", locale:'en' }
//         )
//     });

//     return (
//         <div>
//             <div id='buttonDiv'></div>
//         </div>
//     )
// }