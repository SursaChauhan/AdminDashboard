import { login_error, login_loading, register_loading } from "./ActionTypes"
import axios from 'axios'
export const baseURL = 'https://lms-backend-2-f91h.onrender.com/api'

export const login =(dispatch)=>{
    try{
dispatch({type:login_loading})

const res = axios.post(`${baseURL}/login`,{

})
    }catch(err){
dispatch({type: login_error})
    }
}


export const register =()=>{
    try{
        dispatch({type :register_loading})
        const res = axios.post(`${baseURL}/register`,{
    
        })

    }catch(err){
        
    }
}