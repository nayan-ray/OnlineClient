import React, { useState } from 'react'

import "./emailCheck.css"
import { hideLoader, showLoader } from '../../features/loader/loaderSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Loader from "../../components/loader/Loader"

const TakeEmail = () => {
    const [email, setEmail] = useState('');
    const isLoading = useSelector((state)=> state.loader.isLoading);
    const dispatch = useDispatch()
    const baseURL =  "https://assignment16-g2pa.onrender.com"
    const emailSubmit = async(e)=>{
        e.preventDefault();
       
       try {
         dispatch(showLoader())
         await axios.post(`${baseURL}/api/v1/student/email-verification`, {email}, {
            headers : {
                'Content-Type': 'application/json'
           },
            withCredentials : true
        })
        alert("Student's email taken successfully. Please check your email to reset your password.")
       } catch (error) {
          console.log(error);        
          alert('Failed to send email. Please try again.')
       }finally{
         dispatch(hideLoader());
         setEmail('');
       }
    }
  
    if(isLoading){
      return <Loader />
    }

   return (
    <div className='sign-up-container'>
       <div className="sign-up-wrapper">
          
           <form className="sign-up-form email-check-form" onSubmit={emailSubmit}>
           
            <div className="form-group">
               
                <input type="email" placeholder='Enter your email' required value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading}/>
            </div>
           
               
            <button type="submit" disabled={isLoading}>Check Email</button>
           
           </form>
       </div>
    </div>
  )
}

export default TakeEmail