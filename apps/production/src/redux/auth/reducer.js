import actions from "./actions";

const initState = {
	error: "",
};

export default function reducer(state, action) {
	switch (action.type) {
		case actions.SIGNIN_REQUEST:
			return { ...state };
		case actions.SIGNIN_FAILED:
			return { ...state, user: null };
		case actions.SIGNIN_SUCCESS:
			return { ...state, user: action.user, error: "" };
		case actions.SIGNIN_ERROR:
			return { ...state, error: action.error, user: null };
		case actions.LOGOUT:
			return { ...state, user: null };
		default:
			return state ?? initState;
	}
}
