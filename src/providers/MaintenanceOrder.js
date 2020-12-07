import { CrudProvider } from "./Crud";
import axios from 'axios';

export class MaintenanceOrderProvider extends CrudProvider {

  constructor() {
    super('maintenance-orders')
  }

  async signOrder(userId, orderId, password) {
    return this.handleRequest(axios.post(`${this.baseUrl}/${orderId}/signatures`, {
      userId,
      password,
    }, {
      headers: this.getHeaders(),
    }));
  }

  async getWorkedTimes(orderId) {
    return this.handleRequest(
      axios.get(`${this.baseUrl}/${orderId}/worked-times`, { headers: this.getHeaders() })
    );
  }
}