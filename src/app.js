import React, { Component } from 'react';
import C_Menu from './components/Menu';
import Login from './login/Login';
import Cookies from 'universal-cookie';
import Dashboard from './Dashboard';

class App extends Component {
  constructor() {
    super()

    this.cookies = new Cookies();
    this.onLogout = this.onLogout.bind(this)
    this.onLogin = this.onLogin.bind(this)

    this.state = { token: this.cookies.get('token') || false}
  }

  onLogout() {
    this.cookies.remove('token')
    this.setState({ token: false })
  }

  onLogin() {
    this.setState({ token: this.cookies.get('token') })
  }

  render() {
    const { token } = this.state

    if (!token) {
      return <Login onSuccess={this.onLogin} />
    }

    return <Dashboard />
  }
}

export default App;