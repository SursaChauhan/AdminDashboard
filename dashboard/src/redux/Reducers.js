import {
    Get_data_loading, Get_data_success, Get_data_error, Post_data_error, Post_data_loading,
    Post_data_success, Patch_data_error, Patch_data_loading, Patch_data_success, login_error,
    login_loading, login_success, register_error, register_loading, register_success,
    Delete_data_loading,
    Delete_data_success,
    Delete_data_error, logout,
    LectureData_data_success,
    enrollmentData_data_success, createEnrollment_data_success, chartData_data_success
  } from './ActionTypes.js';
  
  const initialState = {
    isLoading: false,
    isError: false,
    data: [],
    LectureData: [],
    enrollmentData: [],
    formdata: [],
    loginData: [],
    IsLoggedIn: false,
    page: 0,
    totalPages: 0,
    chartData: []
  };
  
  const reducer = (state = initialState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case Get_data_loading:
        console.log('Loading data...');
        return { ...state, isLoading: true, isError: false };
  
      case Get_data_success:
        console.log('Data loaded:', payload);
        return {
          ...state,
          isLoading: false,
          data: payload.courses,
          page: payload.page,
          totalPages: payload.totalPages
        };
  
      case Get_data_error:
        console.error('Error loading data');
        return { ...state, isLoading: false, isError: true };
  
      case Post_data_loading:
        console.log('Posting data...');
        return { ...state, isLoading: true, isError: false };
  
      case Post_data_success:
        console.log('Data posted successfully');
        return { ...state, isLoading: false };
  
      case Post_data_error:
        console.error('Error posting data');
        return { ...state, isLoading: false, isError: true };
  
      case Patch_data_loading:
        console.log('Patching data...');
        return { ...state, isLoading: true, isError: false };
  
      case Patch_data_success:
        console.log('Data patched successfully');
        return { ...state, isLoading: false };
  
      case Patch_data_error:
        console.error('Error patching data');
        return { ...state, isLoading: false, isError: true };
  
      case Delete_data_loading:
        console.log('Deleting data...');
        return { ...state, isLoading: true, isError: false };
  
      case Delete_data_success:
        console.log('Data deleted successfully');
        return { ...state, isLoading: false };
  
      case Delete_data_error:
        console.error('Error deleting data');
        return { ...state, isLoading: false, isError: true };
  
      case login_loading:
        console.log('Logging in...');
        return { ...state, isLoading: true, isError: false };
  
      case login_success:
        console.log('Login successful:');
        return { ...state, IsLoggedIn: true, loginData: payload };
  
      case login_error:
        console.error('Login error');
        return { ...state, isLoading: false, isError: true };
  
      case logout:
        console.log('Logged out');
        return { ...state, IsLoggedIn: false };
  
      case register_loading:
        console.log('Registering...');
        return { ...state, isLoading: true, isError: false };
  
      case register_success:
        console.log('Register successful:', payload);
        return { ...state, isLoading: false, formdata: payload };
  
      case register_error:
        console.error('Register error');
        return { ...state, isLoading: false, isError: true };
  
      case LectureData_data_success:
        console.log('Lecture data loaded:', payload);
        return { ...state, isLoading: false, LectureData: payload };
  
      case enrollmentData_data_success:
        console.log('Enrollment data loaded:', payload);
        return { ...state, isLoading: false, enrollmentData: payload };
  
      case createEnrollment_data_success:
        console.log('Enrollment created successfully');
        return { ...state, isLoading: false };
  
      case chartData_data_success:
        console.log('Chart data loaded:', payload);
        return { ...state, chartData: payload };
  
      default:
        return state;
    }
  };
  
  export default reducer;
  