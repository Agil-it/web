import axios from 'axios';
import { BaseProvider } from './Base';

export class AuthProvider extends BaseProvider {

  constructor() {
    super('login')
  }

  async login(username, password) {
    try {
      const response = await axios.post(`${this.baseUrl}`, {
        username: username,
        password: password
      });
      console.log("TCL: BaseProvider -> get -> response", response)

      let { data } = response
      if (!data.success) {
        return response
      }

      this.updateToken(response)
      return response;

    } catch (error) {
      console.log(error)
      return {
        data: {
          success: false,
          error: error
        }
      }
    }
  }
}