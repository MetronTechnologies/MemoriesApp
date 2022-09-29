import {AUTH, CREATE, DELETE, ENDLOADING, FAIL, FETCH_ALL, LIKE, LOGOUT, SEARCHEDPOSTS, SIGNIN, SIGNUP, SINGLEFETCH, STARTLOADING, UPDATE, COMMENT} from "../ActionTypes/ActionTypes";


function FetchAction(data){
    return {
        type: FETCH_ALL,
        payload: data
    }
}

function CreateAction(data){
    return {
        type: CREATE,
        payload: data
    }
}

function UpdateAction(data){
    return {
        type: UPDATE,
        payload: data
    }
}

function LikeAction(data) {
    return {
        type: LIKE,
        payload: data
    }
}

function DeleteAction(id) {
    return {
        type: DELETE,
        payload: id
    }
}

function FailAction(error) {
    return {
        type: FAIL,
        payload: error
    }
}

function AuthAction(data){
    return {
        type: AUTH,
        payload: data
    }
}

function LogoutAction(){
    return {
        type: LOGOUT
    }
}

function SignupAction(formData){
    return {
        type: SIGNUP,
        payload: formData
    }
}

function SigninAction(formData){
    return {
        type: SIGNIN,
        payload: formData
    }
}

function SearchedPostsAction(data) {
    return {
        type: SEARCHEDPOSTS,
        payload: data
    }
}

function StartLoading(){
    return  {
        type: STARTLOADING
    }
}

function EndLoading(){
    return {
        type: ENDLOADING
    }
}

function SingleFetchAction(data) {
    return {
        type: SINGLEFETCH,
        payload: data
    }
}

function CommentAction(data) {
    return {
        type: COMMENT,
        payload: data
    }
}




export {CreateAction, FetchAction, DeleteAction, LikeAction, UpdateAction, FailAction, AuthAction, LogoutAction, SignupAction, SigninAction, SearchedPostsAction, StartLoading, EndLoading, SingleFetchAction, CommentAction}






