import axios from "axios"
import {store} from "../app/store"
import { hideLoader, showLoader } from "../features/loader/loaderSlice"
import { removeStudentLocal, setStudentLocal } from "../helper/auth"
import { clearStudent } from "../features/signUp/signUpSlice"
const baseURL =  "https://assignment16-g2pa.onrender.com"

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
        return;
    }
   
}

export const activateAccountApi = async(token, navigate)=>{
     try {
        store.dispatch(showLoader())
         await axios.post(`${baseURL}/api/v1/student/activation-student`, {token }, {
            headers : {
                'Content-Type': 'application/json'
           },
            withCredentials : true
        })
         
        navigate("/login", { replace: true });
        return;
    } catch (error) {
       
        alert("Registration failed. Please try again." )
         navigate("/register", { replace: true });
         return  ; 
    }finally{
        store.dispatch(hideLoader())
        return;
    }
}

export const loginApi = async(student, login, navigate)=>{
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
        login(studentData);
        navigate('/dashboard');
        return;
    } catch (error) {
       if(error.status === 404){
            alert('User not found. Please register first.');
            return ;
       }
       if(error.status === 401){
           alert('Invalid password or email.');
           return ;
       }
        alert("Login failed. Please try again." )
        store.dispatch(clearStudent())
        return ; 
    }finally{
        store.dispatch(hideLoader())
        return;
    }
}

export const logOutApi = async(navigate, logout)=>{
     try {
        store.dispatch(showLoader())
        await axios.post(`${baseURL}/api/v1/auth/logout`,  {
            headers : {
                'Content-Type': 'application/json'
           },
            withCredentials : true
        })
        removeStudentLocal();
         logout();
           navigate('/')
        return ;
    } catch (error) {
       
        alert("Logout failed. Please try again." )
        return  ; 
    }finally{
        store.dispatch(hideLoader())
        return;
    }
}