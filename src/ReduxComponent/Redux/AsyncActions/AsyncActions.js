import {
    CommentAction,
    CreateAction, DeleteAction, EndLoading, FailAction,
    FetchAction,
    LikeAction,
    SearchedPostsAction,
    SigninAction,
    SignupAction,
    SingleFetchAction,
    StartLoading,
    UpdateAction
} from "../Actions/ActionCreators";
import { comment, createItem, deleteItem, getItem, getItems, getItemsBySearch, likeItem, signIn, signUp, updateItem } from "../../../ServiceAPI/API";


const Getter = (page) => async (dispatch) => {
    try {
        dispatch(StartLoading())
        const { data } = await getItems(page);
        dispatch(FetchAction(data));
        dispatch(EndLoading())
    }
    catch (error) {
        const errorMessage = error.message;
        dispatch(FailAction(errorMessage));
        console.log(errorMessage);
    }
}

const Liker = (id) => async (dispatch) => {
    try {
        const { data } = await likeItem(id);
        dispatch(LikeAction(data));
    } catch (error) {
        const errorMessage = error;
        dispatch(FailAction(errorMessage));
        console.log(errorMessage);
    }
};

const Creator = (post, navigate) => async (dispatch) => {
    try {
        dispatch(StartLoading());
        const { data } = await createItem(post);
        navigate(`/memories/get/${data._id}`);
        dispatch(CreateAction(data));
        dispatch(EndLoading());
    } catch (error) {
        const errorMessage = error.message;
        dispatch(FailAction(errorMessage));
        console.log(errorMessage);
    }
};

const profile = JSON.parse(localStorage.getItem('profile'));
const user = profile?.userToken?.name;

const Updater = (id, post) => async (dispatch) => {
    try {
        const { data } = await updateItem(id, post);
        dispatch(UpdateAction({ ...data, name: user }));
    } catch (error) {
        const errorMessage = error.message;
        dispatch(FailAction(errorMessage));
        console.log(errorMessage);
    }
};


const Deleter = (id) => async (dispatch) => {
    try {
        await deleteItem(id);
        dispatch(DeleteAction());
    } catch (error) {
        const errorMessage = error;
        dispatch(FailAction(errorMessage))
        console.log(errorMessage);
    }
};

const SignIn = (formData, navigate) => async (dispath) => {
    try {
        const { data } = await signIn(formData);
        dispath(SigninAction(data));
        navigate("/");
    } catch (error) {
        console.log(error);
    }
}

const SignUp = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await signUp(formData);
        dispatch(SignupAction(data));
        navigate("/");
    } catch (error) {
        console.log(error);
    }
}

const GetPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch(StartLoading());
        const { data: { data } } = await getItemsBySearch(searchQuery);
        dispatch(SearchedPostsAction(data));
        dispatch(EndLoading());
    } catch (error) {
        console.log(error)
    }
}

const SingleGetter = (id) => async (dispatch) => {
    try {
        dispatch(StartLoading())
        const { data } = await getItem(id);
        dispatch(SingleFetchAction(data));
        dispatch(EndLoading())
    } catch (error) {
        console.log(error)
    }
}

const Commenter = (theComment, postId) => async (dispatch) => {
    try {
        const { data } = await comment(theComment, postId);
        dispatch(CommentAction(data));
        return data.comments;
    } catch (error) {
        console.log(error);
    }
}


export { Creator, Getter, Updater, Liker, Deleter, SignIn, SignUp, GetPostsBySearch, SingleGetter, Commenter }


















