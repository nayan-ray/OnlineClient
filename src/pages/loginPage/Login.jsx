import React, { useContext } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import "./login.css"
import { clearStudent, setStudent } from '../../features/login/loginSlice'
import { loginApi } from '../../api/signUpApi'
import { AuthContext } from '../../context/AuthenContex'

const Login = () => {
   const student = useSelector((state) => state.login.student);
     const isLoading = useSelector((state)=> state.loader.isLoading);
     const dispatch = useDispatch()
     const navigate = useNavigate();
     const {login} = useContext(AuthContext)

     const handleSubmit = async(e)=>{
        e.preventDefault();
        await loginApi(student, login, navigate,);
     }
  return (
    <div className='login-container'>
       <div className="login-wrapper">
           <h2 className='login-title'>Login</h2>
           <form className="login-form" onSubmit={handleSubmit}>
           
            <div className="form-group">
                <label htmlFor="user-email">
                   email : 
                </label>
                <input type="email" name='email' value={student?.email || ''} id='user-email' placeholder='Enter your email' required disabled={isLoading} onChange={(e) => dispatch(setStudent({field: e.target.name, value: e.target.value}))}/>
            </div>
            <div className="form-group">
                <label htmlFor="user-password">
                   password : 
                </label>
                <input type="password" name='password' value={student?.password || ''} id='user-password' placeholder='Enter your password' required disabled={isLoading} onChange={(e) => dispatch(setStudent({field: e.target.name, value: e.target.value}))}/>
            </div>
           
            
          
           
            <button type="submit">Log in</button>
            <p>Not registered yet? please <Link to={"/register"}>Sign Up</Link> </p>
            <p><Link to={"/check-email"}>Forgot Password ?</Link></p>
           </form>
       </div>
    </div>
  )
}

export default Login