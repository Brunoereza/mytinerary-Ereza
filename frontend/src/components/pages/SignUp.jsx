import React from 'react'
import Signup from '../SignUp'
import GoogleSignUp from '../SignUpGoogle'

function SignUp(){
    return(
        <>
        <div>
            <Signup />
        </div>
        <div>
            <GoogleSignUp />
        </div>
        </>
        
        
    )
}
export default SignUp()
