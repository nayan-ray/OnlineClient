import React from 'react'
import "./active.css"
import {useNavigate, useParams} from "react-router-dom"
import { useSelector} from 'react-redux'
import { activateAccountApi } from '../../api/signUpApi';
import Loader from '../../components/loader/Loader';

const ActiveAccount = () => {
   const {token} = useParams(); 
    const navigate = useNavigate();
   const isLoading = useSelector((state)=> state.loader.isLoading);
   const handleSubmitApi = async()=>{
      await activateAccountApi(token, navigate); 
   }
 if(isLoading){
    return <Loader />
 }

  return (
    <div className='sign-up-container'>
       <div className="sign-up-wrapper text-center active-button " onClick={handleSubmitApi}>
             Please click me to active your account finally.
        </div>
    </div>
  )
}

export default ActiveAccount