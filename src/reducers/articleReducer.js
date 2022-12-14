import { SET_LOADING_STATUS, GET_ARTICLES } from "../actions/actionTypes";

const initialState = {
  loading: false,
  articles: [],
};

const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ARTICLES:
      return { ...state, articles: action.payload };
    case SET_LOADING_STATUS:
      return { ...state, loading: action.status };
    default:
      return state;
  }
};

export default articleReducer;
