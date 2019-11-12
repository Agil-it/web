import React, { Component } from 'react';
import C_Menu from './components/Menu';
import Login from './login/Login';

class App extends Component {
  constructor() {
    super()

    //this.state = { token: cookie.load('token') }
    this.state = { token: false }

    this.onLogin = this.onLogin.bind(this)
    this.onLogout = this.onLogout.bind(this)

  }

  onLogin(token) {
    this.setState({ token })
    // cookie.save('token', token, {
    //   httpOnly: true,
    //   sameSite: 'strict'
    // })
  }

  onLogout() {
    // cookie.remove('token', {
    //   httpOnly: true,
    //   sameSite: 'strict'
    // })
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