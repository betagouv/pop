const authActions = {
  SIGNIN_REQUEST: 'SIGNIN_REQUEST',
  SIGNIN_SUCCESS: 'SIGNIN_SUCCESS',
  SIGNIN_ERROR: 'SIGNIN_ERROR',
  LOGOUT: 'LOGOUT',

  signin: (email, password) => ({
    type: authActions.SIGNIN_REQUEST,
    email,
    password
  }),

  logout: () => ({
    type: authActions.LOGOUT,
  }),

};
export default authActions;
