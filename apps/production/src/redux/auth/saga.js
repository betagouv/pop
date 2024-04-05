import { push } from "connected-react-router";
import { all, put, takeEvery } from "redux-saga/effects";
import actions from "./actions";

import api from "../../services/api";

export function* signin({ email, password }) {
	try {
		const { user, success, msg, id_app } = yield api.signin(
			email,
			password,
		);
		if (!success) {
			yield put({ type: actions.SIGNIN_ERROR, error: msg });
			return;
		}

		yield put({ type: actions.SIGNIN_SUCCESS, user });
		localStorage.setItem("cgu", true);
		localStorage.setItem("application", id_app);

		if (process.env.SENTRY_DSN) {
			Raven.setUserContext({ email });
		}

		amplitude.getInstance().setUserId(email);

		yield put(push("/"));
	} catch (e) {
		yield put({ type: actions.SIGNIN_ERROR, error: e.msg });
	}
}

export function* signinByToken() {
	let response = null;
	try {
		response = yield api.getAuthUser();
	} catch (e) {}
	if (response && response.user) {
		if (process.env.SENTRY_DSN) {
			Raven.setUserContext({ email: response.user.email });
		}

		yield put({ type: actions.SIGNIN_SUCCESS, user: response.user });
		return;
	}

	yield put({ type: actions.SIGNIN_FAILED });
}

export function* logOut() {
	try {
		yield api.logout();
	} catch (error) {
		console.error("L'api est inaccessible.");
	}
}

export default function* rootSaga() {
	yield all([
		takeEvery(actions.SIGNIN_REQUEST, signin),
		takeEvery(actions.LOGOUT, logOut),
		takeEvery(actions.SIGNIN_BY_TOKEN_REQUEST, signinByToken),
	]);
}
