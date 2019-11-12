import React, { Component } from 'react';
import C_Menu from './components/Menu';
import Login from './login/Login';
import Cookies from 'universal-cookie';

class App extends Component {
  constructor() {
    super()

    this.cookies = new Cookies();
    this.onLogout = this.onLogout.bind(this)

  }

  onLogout() {
    this.cookies.remove('token')
  }

  render() {
    const token = this.cookies.get('token')

    console.log(token)

    if (!token) {
      return <Login />
    }

    return <C_Menu onLogout={this.onLogout}/>
  }
}

export default App;