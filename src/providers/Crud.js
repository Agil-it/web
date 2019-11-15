import axios from 'axios';
import { BaseProvider } from "./Base";

export class CrudProvider extends BaseProvider {

  constructor(moduleAPI) {
    super(moduleAPI)
  }

  async get(id) {
    return this.handleRequest(axios.get(`${this.baseUrl}/${id}`, {
      headers: this.getHeaders()
    }))
  }

  async getList() {
    return this.handleRequest(axios.get(`${this.baseUrl}`, {
      headers: this.getHeaders()
    }))
  }

  async create(obj) {
    return this.handleRequest(axios.post(`${this.baseUrl}`, obj, {
      headers: this.getHeaders()
    }))
  }

  async update(id, obj) {
    return this.handleRequest(axios.patch(`${this.baseUrl}/${id}`, obj, {
      headers: this.getHeaders()
    }))
  }

  async delete(id) {
    return this.handleRequest(axios.delete(`${this.baseUrl}/${id}`, {
      headers: this.getHeaders()
    }))
  }
}