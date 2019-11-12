import React, { Component } from 'react';
import C_Menu from './components/Menu';
import Login from './login/Login';
import Cookies from 'universal-cookie';

class App extends Component {
  constructor() {
    super()

    this.cookies = new Cookies();

    this.state = { token: this.cookies.get('token') }

    this.onLogin = this.onLogin.bind(this)
    this.onLogout = this.onLogout.bind(this)

  }

  onLogin(token) {
    this.setState({ token })
    this.cookies.set('token', token, { path: '/' })
  }

  onLogout() {
    this.cookies.remove('token')
    this.setState({ token: false })
  }

  render() {
    const { token } = this.state

    console.log(token)

    if (!token) {
      return <Login onSuccess={this.onLogin} />
    }

    return <C_Menu onLogout={this.onLogout}/>
  }
}

export default App;