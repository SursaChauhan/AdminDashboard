import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import {
  login_loading,
  login_success,
  login_error,
  register_loading,
  register_success,
  register_error,
  Get_data_loading,
  Get_data_success,
  Get_data_error,
  Post_data_loading,
  Post_data_success,
  Post_data_error,
  Patch_data_loading,
  Patch_data_success,
  Patch_data_error,
  Delete_data_loading,
  Delete_data_success,
  Delete_data_error,
  LectureData_data_success,
  enrollmentData_data_success,
  createEnrollment_data_success,
  logout,chartData_data_success
} from './ActionTypes';

const baseURL = 'http://localhost:8080/api';

// Function to handle errors
const handleApiError = (dispatch, error, actionType) => {
  console.error('API Error:', error);
  dispatch({ type: actionType, payload: error });
  toast.error(error.response?.data?.message || 'Something went wrong');
};

// Login Action
export const login = (formdata) => async (dispatch) => {
  dispatch({ type: login_loading });
  const { email, password } = formdata;
  try {
    const res = await axios.post(`${baseURL}/login`, { email, password });
    dispatch({ type: login_success, payload: res.data });
  } catch (err) {
    handleApiError(dispatch, err, login_error);
  }
};

// Register Action
export const register = (formdata) => async (dispatch) => {
  dispatch({ type: register_loading });
  try {
    const res = await axios.post(`${baseURL}/register`, formdata);
    dispatch({ type: register_success, payload: res.data });
    toast.success(res.data.message);
  } catch (err) {
    handleApiError(dispatch, err, register_error);
  }
};

// Get Data Action
export const getData = (token, page, limit) => async (dispatch) => {
  dispatch({ type: Get_data_loading });
  try {
    const res = await axios.get(`${baseURL}/courses`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { page, limit }
    });
    dispatch({ type: Get_data_success, payload: res.data });
  } catch (error) {
    handleApiError(dispatch, error, Get_data_error);
  }
};

// Post Course Action
export const postCourse = (courseData, token) => async (dispatch) => {
  dispatch({ type: Post_data_loading });
  try {
    const res = await axios.post(`${baseURL}/courses`, courseData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    dispatch({ type: Post_data_success });
    dispatch(getData(token));
  } catch (error) {
    handleApiError(dispatch, error, Post_data_error);
  }
};

// Patch Course Action
export const patchCourse = (token, courseId, courseData) => async (dispatch) => {
  dispatch({ type: Patch_data_loading });
  try {
    const res = await axios.patch(`${baseURL}/courses/${courseId}`, courseData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    dispatch({ type: Patch_data_success });
    dispatch(getData(token));
  } catch (error) {
    handleApiError(dispatch, error, Patch_data_error);
  }
};

// Delete Course Action
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
    handleApiError(dispatch, error, Delete_data_error);
  }
};

// Get Lectures By Course ID Action
export const getLecturesById = (token, courseId) => async (dispatch) => {
  dispatch({ type: Get_data_loading });
  try {
    const res = await axios.get(`${baseURL}/lectures`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { courseId }
    });
    dispatch({ type: LectureData_data_success, payload: res.data });
  } catch (error) {
    handleApiError(dispatch, error, Get_data_error);
  }
};

// Get Enrollment Data Action
export const getEnrollData = (token) => async (dispatch) => {
  dispatch({ type: Get_data_loading });
  try {
    const res = await axios.get(`${baseURL}/enroll`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    dispatch({ type: enrollmentData_data_success, payload: res.data });
    const courseIds = res.data.map(course => course.course);
    let allLectures = [];
    await Promise.all(courseIds.map(async courseId => {
      const lecturesRes = await axios.get(`${baseURL}/lectures`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { courseId }
      });
      allLectures = [...allLectures, ...lecturesRes.data];
    }));
    dispatch({ type: LectureData_data_success, payload: allLectures });
  } catch (error) {
    handleApiError(dispatch, error, Get_data_error);
  }
};

// Enroll Course Action
export const enrollCourse = (token, courseId) => async (dispatch) => {
  try {
    const response = await axios.post(`${baseURL}/enroll/${courseId}`, {}, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    dispatch({ type: createEnrollment_data_success });
  } catch (error) {
    handleApiError(dispatch, error, Get_data_error);
  }
};

export const logout_success = () => (dispatch) => {
  // Clear cookies
  Cookies.remove('persist:root');
  
  // Dispatch logout action to update state
  dispatch({ type: logout });
};



export const getOwnCourses = (token) => async (dispatch) => {
  dispatch({ type: 'Get_data_loading' });
  console.log('Getting own courses');
  try {
    const res = await axios.get(`${baseURL}/ownCourses`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log('Own courses response:', res.data.populatedCourses);

    // Extract _id from each course object and make individual API calls for course count
    const coursePromises = res.data.populatedCourses.map(async (course) => {
      const courseRes = await axios.get(`${baseURL}/coursecount`, {
        headers: { Authorization: `Bearer ${token}` },
        params:{
          courseId: course._id
        }
      });
      return { ...course, count: courseRes.data.count };
    });

    // Wait for all promises to resolve
    const coursesWithData = await Promise.all(coursePromises);

    console.log('Courses with count:', coursesWithData);

    // Dispatch success action with the courses including count
    dispatch({ type:chartData_data_success, payload: coursesWithData });
  } catch (error) {
    handleApiError(dispatch, error, 'Get_data_error');
  }
};
