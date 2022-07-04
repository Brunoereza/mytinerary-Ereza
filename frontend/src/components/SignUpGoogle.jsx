import React, { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import usersActions from '../redux/actions/usersActions'
import { PromiseProvider } from 'mongoose';


export default function GoogleSignUp(props) {
    const dispatch = useDispatch();


    function handleCallbackResponse(response) {
        console.log(response.credential);
        let userObject = jwt_decode(response.credential);
        console.log(userObject);
        dispatch(usersActions.signUpUsers({
            firstName: userObject.given_name,
            lastName:userObject.family_name,
            email:userObject.email, 
            country: props.country,
            imgProfile:userObject.picture,
            password:userObject.sub, 
            from: 'google'
        }))
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: '641139363527-q8o6ihv595g61iofpddqq0rt7alqor81.apps.googleusercontent.com',
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