
import actions from './actions';

const initState = {
  user: null,
  token: null,
  error: "",
}

export default function reducer(state = initState, action) {
  switch (action.type) {
    case actions.SIGNIN_REQUEST:
      return { ...state, user: null, token: null };
    case actions.SIGNIN_SUCCESS:
      return { ...state, user: action.user, token: action.token };
    case actions.SIGNIN_ERROR:
      return { ...state, error: action.error, user: null, token: null };
    case actions.LOGOUT:
      return initState;
    default:
      return state;
  }
}
