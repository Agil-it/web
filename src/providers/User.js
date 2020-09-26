import { CrudProvider } from "./Crud";
import axios from 'axios';

export class UserProvider extends CrudProvider {

 constructor() {
  super('users')
 }

  getNotifications(userId){
    return this.handleRequest(axios.get(`${this.baseUrl}/${userId}/notifications`, {
      headers: this.getHeaders(),
    }))
  }
}