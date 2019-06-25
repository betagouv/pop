import { reducer as form } from "redux-form";
import { reducer as toastr } from "react-redux-toastr";
import Auth from "./auth/reducer";
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

export default history => combineReducers({ router: connectRouter(history), form, toastr, Auth });
