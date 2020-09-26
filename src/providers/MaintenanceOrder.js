import { CrudProvider } from "./Crud";
import axios from 'axios';

export class MaintenanceOrderProvider extends CrudProvider {

  constructor() {
    super('maintenance-orders')
  }

  async signOrder(userId, orderId) {
    return this.handleRequest(axios.post(`${this.baseUrl}/${orderId}/signatures`, {
      userId,
    }, {
      headers: this.getHeaders(),
    }))
  }
}