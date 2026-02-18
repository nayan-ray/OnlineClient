import React, { useRef, useState } from 'react'
import "./resetPassword.css"
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/loader/Loader';
import axios from 'axios';
import { hideLoader, showLoader } from '../../features/loader/loaderSlice';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const confirmRef = useRef();
  const {token} = useParams();
  const isLoading = useSelector((state)=> state.loader.isLoading);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
 const baseURL =  "https://assignment16-g2pa.onrender.com"
 
 
  const passwordSubmit = async(e)=>{
    e.preventDefault();
    if(password !== confirmPassword){
      alert("Password and confirm password do not match.");
      return;
    }
    
    try {
       dispatch(showLoader())
         await axios.post(`${baseURL}/api/v1/student/reset-password`, {token, newPassword: password}, {
            headers : {
                'Content-Type': 'application/json'
           },
            withCredentials : true
        })
        alert("Student's password reset successfully.");
        Navigate('/login');
    } catch (error) {
       console.log(error);
        alert('Failed to reset password. Please try again.')  
    }finally{
       dispatch(hideLoader());
      
       setPassword('');
       setConfirmPassword('');
       
    }

  }
  if(isLoading){
    return <Loader />
  }
  return (
    <div className='sign-up-container'>
       <div className="sign-up-wrapper">
          
           <form className="sign-up-form password-reset-form" onSubmit={passwordSubmit}>
           
             <div className="form-group">
                
                <input type="password"  placeholder='Enter new password' required value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading}/>
            </div>
           
           <div className="form-group">
               
                <input type="password" ref={confirmRef} placeholder='Confirm password' required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} disabled={isLoading}/>
            </div>
               
            <button type="submit" disabled={isLoading}>Reset password</button>
                
           </form>
       </div>
    </div>
  )
}

export default ResetPassword