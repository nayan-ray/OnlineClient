import React from 'react'
import "./signUp.css"
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setStudent } from '../../features/signUp/signUpSlice'
import { authApi, authApiNormally } from '../../api/signUpApi'

const SignUp = () => {
     const student = useSelector((state) => state.signup.student);
     const isLoading = useSelector((state)=> state.loader.isLoading);
    const navigate = useNavigate();
     const dispatch = useDispatch();

     
     const handleSignUpNormally = (e)=>{
        // handle sign up normally without email verification
         e.preventDefault();
         authApiNormally(student, navigate);
     }

     const handleSubmit = (e)=>{
         e.preventDefault();
         authApi(student);
     }
  return (
    <div className='sign-up-container'>
       <div className="sign-up-wrapper">
           <h2 className='sign-up-title'>Sign Up</h2>
           <form className="sign-up-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="user-name">
                   Student Name : 
                </label>
                <input type="text" id='user-name' name='name'  value={student?.name || ''} placeholder='Enter your name' required onChange={(e) => dispatch(setStudent({field: e.target.name, value: e.target.value}))} disabled={isLoading}/>
            </div>
            <div className="form-group">
                <label htmlFor="user-email">
                   email : 
                </label>
                <input type="email" id='user-email' name='email' value={student?.email || ''} placeholder='Enter your email' required onChange={(e)=> dispatch(setStudent({field : e.target.name, value : e.target.value}))} disabled={isLoading}/>
            </div>
            <div className="form-group">
                <label htmlFor="user-password">
                   password : 
                </label>
                <input type="password" id='user-password' name='password' value={student?.password || ''} placeholder='Enter your password' required onChange={(e) => dispatch(setStudent({field: e.target.name, value: e.target.value}))} disabled={isLoading}/>
            </div>
            <div className="form-group">
                <label htmlFor="user-address">
                   address : 
                </label>
                <input type="text" id='user-address' name='address' value={student?.address || ''} placeholder='Enter your address' required onChange={(e) => dispatch(setStudent({field: e.target.name, value: e.target.value}))} disabled={isLoading}/>
            </div>
            <div className="form-group">
                <label htmlFor="user-phone">
                   phone : 
                </label>
                <input type="text" id='user-phone' name='phone' value={student?.phone || ''} placeholder='Enter your phone' required onChange={(e) => dispatch(setStudent({field: e.target.name, value: e.target.value}))} disabled={isLoading}/>
            </div>
            <div className="form-group">
                <label htmlFor="user-class">
                   class : 
                </label>
                {/* dropdown for class */}
                <select className='dropdown-class'  id="user-class" name='classId' value={student?.classId || ''} required onChange={(e) => dispatch(setStudent({field: e.target.name, value: e.target.value}))} disabled={isLoading}>
                    <option value="">Select Class</option>
                    <option value="693f766e9d21b62514bf567a">Ten</option>                
                </select>
            </div>
           
            <button onClick={handleSignUpNormally} disabled={isLoading}>Sign Up Normally</button>
            <p>OR</p>
            <button type="submit" disabled={isLoading}>Sign Up with email verification</button>
            <p>Already have an account? please <Link to={"/login"}>Login</Link></p>
           </form>
       </div>
    </div>
  )
}

export default SignUp