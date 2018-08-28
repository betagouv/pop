import React from 'react';
import Loader from './components/loader'

import { store, history } from './redux/store'
import PublicRoutes from './router'
import api from './services/api'

class App extends React.Component {

  state = {
    loading: true,
    user: null
  }

  async componentWillMount() {
    const token = localStorage.getItem('token')
    if (token) {
      const user = await api.getUser(token) 
      this.setState({
        user
      })
    }
    this.setState({
      loading: false
    })
  }

  render() {
    if (this.state.loading) {
      return <Loader />
    }
    return <PublicRoutes history={history} />
  }
}

export default App
