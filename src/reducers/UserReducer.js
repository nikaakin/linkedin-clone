import { GOOGLE_AUTH_ERROR, SET_USER } from "../actions/actionTypes";

const INITIAL_STATE = {
  user: null,
};

export const UserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case GOOGLE_AUTH_ERROR:
      return {
        ...state,
        error: `Google auth denied ${action.payload.message}`,
      };
    default:
      return state;
  }
};
