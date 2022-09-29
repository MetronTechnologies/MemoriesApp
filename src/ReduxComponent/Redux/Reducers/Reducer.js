import { initialState } from "../Initials/InitialState";
import {
  AUTH,
  COMMENT,
  CREATE,
  DELETE,
  ENDLOADING,
  FAIL,
  FETCH_ALL,
  LIKE,
  LOGOUT,
  SEARCHEDPOSTS,
  SIGNIN,
  SIGNUP,
  SINGLEFETCH,
  STARTLOADING,
  UPDATE,
} from "../ActionTypes/ActionTypes";

function MemoryReducer(state = initialState, action) {
  switch (action.type) {
    case STARTLOADING:
      return {
        ...state,
        loading: true
      }

    case ENDLOADING:
      return {
        ...state,
        loading: false
      }

    // case COMMENT:
    //   return {
    //     ...state,
    //     reply: state.reply.map(
    //       (rep) => (
    //         rep._id === action.payload ? action.payload : rep
    //       )
    //     )
    //   }

    case FETCH_ALL:
      return {
        ...state,
        reply: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages
      };

    case SINGLEFETCH:
      return {
        ...state,
        singleReply: action.payload
      }

    case SEARCHEDPOSTS:
      return {
        ...state,
        reply: action.payload
      }

    // case LIKE:
    //     return {
    //         ...state,
    //         reply: state.reply.map(
    //             (rep) => (
    //                 rep._id === action.payload._id ? action.payload : rep
    //             )
    //         )
    //     }

    case CREATE:
      return {
        ...state,
        reply: [...state.reply, action.payload],
      };

    case UPDATE:
    case LIKE:
    case COMMENT:
      const newReply = state.reply.map(
        (rep) => {
          return rep._id === action.payload._id ? action.payload : rep;
        }
      )
      return {
        ...state,
        reply: newReply
      };

    case DELETE:
      const arr = state.reply;
      const indexOfObject = arr.findIndex((object) => {
        return object.id === action.payload;
      });
      arr.splice(indexOfObject, 1);
      return {
        ...state,
        reply: arr,
      };

    case FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case AUTH:
    case SIGNIN:
    case SIGNUP:
      localStorage.setItem("profile", JSON.stringify(action?.payload))
      return {
        ...state,
        authData: action.payload
      };

    case LOGOUT:
      localStorage.clear();
      return {
        ...state,
        authData: null
      }

    default:
      return state;
  }
}



export { MemoryReducer };
