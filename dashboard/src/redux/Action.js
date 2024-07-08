import { Delete_data_error, Delete_data_loading, Delete_data_success, Get_data_error, Get_data_loading, Get_data_success, login_error, login_loading, login_success, logout, Patch_data_error, Patch_data_loading, Patch_data_success, Post_data_error, Post_data_loading, Post_data_success, register_error, register_loading, register_success } from "./ActionTypes"
import axios from 'axios'
import { toast } from 'react-toastify';
const baseURL = 'http://localhost:8080/api';


export const login = (formdata) => async (dispatch) => {

  dispatch({ type: login_loading })
  const { email, password } = formdata;
  try {
    const res = await axios.post('http://localhost:8080/api/login', { email, password }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }) 
     console.log(res.data.user.role);
    dispatch({ type: login_success, payload: res.data })
  } catch (err) {
   
    toast.error(err.response.data.message);
    dispatch({ type: login_error, payload: err })
  }
}


export const register = (formdata) => async (dispatch) => {
  dispatch({ type: register_loading })

  try {

    const res = await axios.post('http://localhost:8080/api/register', formdata, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    dispatch({ type: register_success, payload: res.data })
    // console.log(res);
    toast.success(res.data.message);

  } catch (err) {
    console.log(err);
    dispatch({ type: register_error, payload: err })
  }
}

export const logout_success = () => ({
  type: logout
});

export const getData = (token, page, limit) => async (dispatch) => {
  dispatch({ type: Get_data_loading })
  try {
    const res = await axios.get(`${baseURL}/courses`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        page,  // specify the page number you want to fetch
        limit // specify the number of items per page
      }
    })
// console.log(res.data);
    dispatch({ type: Get_data_success, payload: res.data })
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({ type: Get_data_error, payload: error })
  }
}

export const postCourse = (courseData, token) => async (dispatch) => {
  dispatch({ type: Post_data_loading });
  try {
    console.log(courseData);
    for (let pair of courseData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }
    const res = await axios.post(`${baseURL}/courses`, courseData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    
    dispatch({ type: Post_data_success });

  
    dispatch(getData(token));
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({ type: Post_data_error, payload: error });
  }
};

// PATCH Course
export const patchCourse = (token, courseId, courseData) => async (dispatch) => {
  dispatch({ type: Patch_data_loading });
  try {
    console.log(token, courseId, courseData);
    const res = await axios.patch(`${baseURL}/courses/${courseId}`, courseData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    dispatch({ type: Patch_data_success });
    dispatch(getData(token));
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({ type: Patch_data_error, payload: error });
  }
};

export const deleteCourse = (token, courseId) => async (dispatch) => {
  dispatch({ type: Delete_data_loading });
  try {
    const res = await axios.delete(`${baseURL}/courses/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    toast.success(res.data.message);
    dispatch({ type: Delete_data_success });
    dispatch(getData(token));
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({ type: Delete_data_error, payload: error });
  }
};