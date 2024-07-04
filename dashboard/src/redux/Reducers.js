import  {Get_data_loading, Get_data_success, Get_data_error, Post_data_error, Post_data_loading, 
    Post_data_success, Patch_data_error, Patch_data_loading, Patch_data_success, login_error, 
    login_loading, login_success, register_error, register_loading, register_success,
    Delete_data_loading,
    Delete_data_success,
    Delete_data_error}  from './ActionTypes.js';


let initialState = {
    isLoading: false,
    isError: false,
data:[]
}

const reducer = (state = initialState, action) => {

    const { type, payload } = action

    switch (type) {
        case Get_data_loading : return {...state,isLoading:true,isError:false}
        case Get_data_success : return {...state,isLoading:false,data:payload}
        case Get_data_error : return {...state,isLoading:false,isError:true}

        case Post_data_loading : return {...state,isLoading:true,isError:false}
        case Post_data_success : return {...state,isLoading:false,data:payload}
        case Post_data_error : return {...state,isLoading:false,isError:true}

        case Patch_data_loading : return {...state,isLoading:true,isError:false}
        case Patch_data_success : return {...state,isLoading:false,data:payload}
        case Patch_data_error   : return {...state,isLoading:false,isError:true}

        case Delete_data_loading: return {...state,isLoading:true,isError:false}
        case Delete_data_success : return {...state,isLoading:false,data:payload}
        case Delete_data_error   : return {...state,isLoading:false,isError:true}

        case login_loading : return {...state,isLoading:true,isError:false}
        case login_success : return {...state,isLoading:false,data:payload}
        case login_error   : return {...state,isLoading:false,isError:true}

        case register_loading : return {...state,isLoading:true,isError:false}
        case register_success : return {...state,isLoading:false,data:payload}
        case register_error  : return {...state,isLoading:false,isError:true}

        default :return state;
    }
}
export default reducer;