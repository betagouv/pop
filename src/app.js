import React from 'react';
import Loader from './components/loader'

import { history } from './redux/store'
import PublicRoutes from './router'
import Actions from './redux/auth/actions'
const { signinByToken } = Actions
import { connect } from 'react-redux'

class App extends React.Component {

  componentWillMount() {
    this.props.signinByToken()
  }

  render() {
    if (this.props.user === undefined) {
      return <Loader />
    }
    return <PublicRoutes history={history} />
  }
}

const mapstatetoprops = ({ Auth }) => ({ user: Auth.user })

export default connect(mapstatetoprops, { signinByToken })(App);
