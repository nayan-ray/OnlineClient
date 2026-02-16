import axios from "axios"
import {store} from "../app/store"
import { hideLoader, showLoader } from "../features/loader/loaderSlice"
import { removeStudentLocal, setStudentLocal } from "../helper/auth"
import { baseURL } from "./baseUrl"

export const authApi = async(student)=>{
    try {
        store.dispatch(showLoader())
         await axios.post(`${baseURL}/api/v1/student/register`, student, {
            headers : {
                'Content-Type': 'application/json'
           },
            withCredentials : true
        })
        alert("Student's info taken successfully. Please check your email to activate your account.")
        
    } catch (error) {
        if(error.status === 409){
            alert("User already exists. Please Login.");
            return;
        }
        alert("Registration failed. Please try again." )
           
    }finally{
        store.dispatch(hideLoader())
    }
   
}

export const activateAccountApi = async(token)=>{
     try {
        store.dispatch(showLoader())
         await axios.post(`${baseURL}/api/v1/student/activation-student`, {token }, {
            headers : {
                'Content-Type': 'application/json'
           },
            withCredentials : true
        })
        alert("Student's info taken successfully. Please check your email to activate your account.")
        return true;
    } catch (error) {
       
        alert("Registration failed. Please try again." )
         return false ; 
    }finally{
        store.dispatch(hideLoader())
    }
}

export const loginApi = async(student)=>{
     try {
        store.dispatch(showLoader())
       const response =  await axios.post(`${baseURL}/api/v1/auth/login`, student, {
            headers : {
                'Content-Type': 'application/json'
           },
            withCredentials : true
        })
        const studentData = response.data.payload
        setStudentLocal(studentData);
        return studentData;
    } catch (error) {
       if(error.status === 404){
            alert('User not found. Please register first.');
            return false;
       }
       if(error.status === 401){
           alert('Invalid password or email.');
           return false;
       }
        alert("Login failed. Please try again." )
        return false ; 
    }finally{
        store.dispatch(hideLoader())
    }
}

export const logOutApi = async()=>{
     try {
        store.dispatch(showLoader())
        await axios.post(`${baseURL}/api/v1/auth/logout`,  {
            headers : {
                'Content-Type': 'application/json'
           },
            withCredentials : true
        })
        removeStudentLocal();
        return true;
    } catch (error) {
       
        alert("Logout failed. Please try again." )
        return false ; 
    }finally{
        store.dispatch(hideLoader())
    }
}