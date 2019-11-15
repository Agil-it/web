import axios from 'axios';
import { BaseProvider } from './Base';

export class AuthProvider extends BaseProvider {

  constructor() {
    super('login')
  }

  async login(username, password) {
    return this.handleRequest(axios.post(`${this.baseUrl}`, {
      username: username,
      password: password
    }))
  }
}