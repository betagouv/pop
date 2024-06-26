import React from "react";
import { Route, Switch } from "react-router-dom";

import UpdatePassword from "./UpdatePassword";
import UpdateProfile from "./UpdateProfile";
import Forget from "./forget";
import Signin from "./signin";

import "./index.css";

export default (props) => {
	const { url } = props.match;
	return (
		<div className="auth">
			<Switch>
				<Route exact path={`${url}/signin`} render={() => <Signin />} />
				<Route exact path={`${url}/forget`} render={() => <Forget />} />
				<Route
					exact
					path={`${url}/updateprofile`}
					render={() => <UpdateProfile />}
				/>
				<Route
					exact
					path={`${url}/updatepassword`}
					render={() => <UpdatePassword />}
				/>
			</Switch>
		</div>
	);
};
