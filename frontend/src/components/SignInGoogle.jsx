import React, { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import usersActions from '../redux/actions/usersActions'


export default function GoogleSignIn() {
    const dispatch = useDispatch();


    function handleCallbackResponse(response) {
        console.log(response.credential);
        let userObject = jwt_decode(response.credential);
        console.log(userObject);
        dispatch(usersActions.signInUsers({
            firstName: userObject.given_name,
            lastName:userObject.family_name,
            email:userObject.email, 
            country: "Argentina",
            imgProfile:userObject.picture,
            password:userObject.sub, 
            // role: 'user', 
            from: 'google'
        }))
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: '613504900859-i5d9rnj6gskrsoik0vv6khlk7gof7v2n.apps.googleusercontent.com',
            callback: handleCallbackResponse
        });

        google.accounts.id.renderButton(
            document.getElementById('buttonDiv'),
            { theme: "filled_black", size: "medium", locale:'en' }
        )
    });

    return (
        <div>
            <div id='buttonDiv'></div>
        </div>
    )
}