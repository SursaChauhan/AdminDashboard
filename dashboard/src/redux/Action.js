import { login_error, login_loading, register_error, register_loading, register_success } from "./ActionTypes"
import axios from 'axios'
import { useDispatch } from "react-redux"
 const baseURL = 'http://localhost:8080/api'

// export const login =(dispatch)=>{
//     try{
// dispatch({type:login_loading})

// const res = axios.post(`${baseURL}/login`,{

// })
//     }catch(err){
// dispatch({type: login_error})
//     }
// }


export const register =(formdata)=>async(dispatch)=>{
    dispatch({type :register_loading})
    
    try{
       
        const res = await axios.post('http://localhost:8080/api/register', formdata, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
         
        dispatch({type  :register_success,payload: res.data})
       

    }catch(err){
        console.log(err);
        dispatch({type : register_error,payload:err}) 
    }
}