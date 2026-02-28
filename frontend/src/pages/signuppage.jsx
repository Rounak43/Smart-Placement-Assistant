import Signin from './signin'
import Signup from './signup'

import '../styles/Signuppage.css'


export default function Signuppage() {
    return (
        <div className="signpage">
            <div className="midcircle">
                <button className="signup-btn">Sign Up</button>
                <hr className='midline' />
                <button className="signin-btn">Log In</button>
            </div>
        </div>
    )
}