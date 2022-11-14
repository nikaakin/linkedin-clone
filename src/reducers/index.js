import { combineReducers } from "redux";

import { UserReducer } from "./UserReducer";
import articleReducer from "./articleReducer";

export default combineReducers({
  userState: UserReducer,
  articleState: articleReducer,
});
