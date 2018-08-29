const authActions = {
  SIGNIN_REQUEST: 'SIGNIN_REQUEST',
  SIGNIN_BY_TOKEN_REQUEST: 'SIGNIN_BY_TOKEN_REQUEST',
  SIGNIN_SUCCESS: 'SIGNIN_SUCCESS',
  SIGNIN_ERROR: 'SIGNIN_ERROR',
  SIGNIN_FAILED: 'SIGNIN_FAILED',
  LOGOUT: 'LOGOUT',

  signin: (email, password) => ({
    type: authActions.SIGNIN_REQUEST,
    email,
    password
  }),

  signinByToken: () => ({
    type: authActions.SIGNIN_BY_TOKEN_REQUEST
  }),

  logout: () => ({
    type: authActions.LOGOUT,
  }),

};
export default authActions;
