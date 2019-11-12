import React, { Component } from 'react';
import C_Menu from './components/Menu';
import Login from './login/Login';
import cookie from 'react-cookies';

class App extends Component {
 constructor() {
  super()

  this.onLogin = this.onLogin.bind(this)

 }

 componentWillMount() {
  this.state = { token: cookie.load('token') }
 }

 onLogin(token) {
  this.setState({ token })
  cookie.save('token', token, {
   httpOnly: true,
   sameSite: 'strict'
  })
 }

 render() {
  const { token } = this.state

  console.log(token)

  if (!token) {
   return <Login onSuccess={this.onLogin} />
  }

  return <C_Menu/>
 }
}

export default App;