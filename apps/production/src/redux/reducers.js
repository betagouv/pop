import { connectRouter } from "connected-react-router";
import { reducer as toastr } from "react-redux-toastr";
import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import Auth from "./auth/reducer";

export default (history) =>
	combineReducers({ router: connectRouter(history), form, toastr, Auth });
