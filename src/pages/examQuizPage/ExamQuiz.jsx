import React, { useContext, useEffect } from 'react'
import "../../assets/global.css"
import Header from '../../components/header/Header'
import BreadCrumb from '../../components/breadCrumb/BreadCrumb'
import Footer from '../../components/footer/Footer'
import Loader from '../../components/loader/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { AuthContext } from '../../context/AuthenContex'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { examQuizApi } from '../../api/examQuizApi'
import { clearList, upsertItem } from '../../features/testQuiz/testQuizSlice'
import axios from 'axios'
import { hideLoader, showLoader } from '../../features/loader/loaderSlice'

const ExamQuiz = () => {
    const quizzes = useSelector((state) => state.examQuiz.examQuiz);
   const isLoading = useSelector((state) => state.loader.isLoading);
   const submitAnswer = useSelector((state)=> state.testQuiz.list);
   const dispatch = useDispatch();
   const { setStudent} = useContext(AuthContext);
   const navigate = useNavigate();
   const {subjName, unitName} = useParams();
   const {state} = useLocation();
   const unitId = state || null;
   const baseURL =  "https://assignment16-g2pa.onrender.com"

 useEffect(()=>{
   
      examQuizApi(setStudent, navigate, unitId, unitName);
     
    
  }, [setStudent, navigate, unitId, unitName])


 
 


  const tickHandler = (e, item)=>{
         e.preventDefault();
         const parent = e.target.parentElement;
         const kids = parent.children;
         const kidsArray = [...kids]
         kidsArray.forEach((item)=>{
            item.classList.remove("tick");
            
         })
        e.target.classList.add("tick")
         
      dispatch(
      upsertItem({
        newItem: item,
        key: "quizId"
      })
    );
  }




const testSubmitHandler = async(e)=>{
  e.preventDefault();
 try {
     dispatch(showLoader())
     const response = await axios.post(`${baseURL}/api/v1/exam-quiz/submit`, {anserList : submitAnswer, unitId}, {
              headers : {
                 'Content-Type': 'application/json'
                },
              withCredentials : true
           })
           
         if(response.status === 200 && response.data.success){
             
             alert(`you have got ${response.data.payload.correct}/${response.data.payload.total}`);
             
             navigate(`/dashboard/${subjName}/${unitName}`, {replace : true, state : unitId})
             
         }
               
     } catch (error) {
         if(error.response?.status === 401){
             setStudent(null);
             removeStudentLocal();
             navigate('/login', {replace : true})
         }
      
         console.log(error.message);
         
        
     }finally{
         dispatch(hideLoader())
         dispatch(clearList())
     }


}


 if(isLoading){
    return <Loader />
 }

  return (
    <div className='common-wrapper'>
       <Header />
       <BreadCrumb />
       
      <div>
            <h2 className='text-center mb-4'>Exam Quiz</h2>
            <ul className="list-container">
              {
                quizzes.length > 0 && !isLoading && quizzes.map((quiz, index)=>(
                     <li className="numbering-gap" key={index}>
                      <div className="number-text">{index + 1}.</div>
                      <div className="body-content">
                        <p className="body-justify">{quiz.quizTitle}</p>
                        <div className="option-box">
                           <button className='option-item ' onClick={(e)=> tickHandler(e, {quizId : quiz._id, quizAnsIn : 0})}>A) {quiz.quizOptionA}</button>
                           <button className='option-item' onClick={(e)=> tickHandler(e, {quizId : quiz._id, quizAnsIn : 1})}>B) {quiz.quizOptionB}</button>
                           <button className='option-item' onClick={(e)=> tickHandler(e, {quizId : quiz._id, quizAnsIn : 2})}>C) {quiz.quizOptionC}</button>
                           <button className='option-item' onClick={(e)=> tickHandler(e, {quizId : quiz._id, quizAnsIn : 3})}>D) {quiz.quizOptionD}</button>
                        </div>
                       
                    </div>
               
                  </li>
                ))
              }
              

                
        </ul>
        {quizzes.length === 0 && !isLoading ? <p className='text-center'>No quizzes available</p> :
          <>
          <div className="box-container">
            <span>{`Answered : ${submitAnswer.length}/${quizzes.length}`}</span>
          </div>
          <div className="box-container">
            <button className={submitAnswer.length === quizzes.length ? 'submit-btn activate' : 'submit-btn'} onClick={testSubmitHandler} disabled ={submitAnswer.length !== quizzes.length}>submit</button>
          </div>
        </>
       }
      </div> 

       <Footer />

    </div>
  )
}

export default ExamQuiz