import { login_error, login_loading, login_success, logout, register_error, register_loading, register_success } from "./ActionTypes"
import axios from 'axios'
import { useDispatch } from "react-redux"
 const baseURL = 'http://localhost:8080/api'


export const login =(formdata)=>async(dispatch)=>{
  dispatch({type:login_loading})
  const {email,password} =formdata;
    try{


const res =await axios.post('http://localhost:8080/api/login',{email,password},{
  headers: {
    'Content-Type': 'application/json'
  }
})
console.log(res);
dispatch({type:login_success,payload:res.data})
    }catch(err){
      console.log(err.message);
dispatch({type: login_error,payload:err})
    }
}


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

export const logout_success = () => ({
  type: logout,
});