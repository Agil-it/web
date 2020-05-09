import axios from 'axios';
import { BaseProvider } from "./Base";
import { StringHelper } from '../helpers/String';

export class CrudProvider extends BaseProvider {

  constructor(moduleAPI) {
    super(moduleAPI)
  }

  async get(id) {
    return this.handleRequest(axios.get(`${this.baseUrl}/${id}`, {
      headers: this.getHeaders()
    }))
  }

  async getList(data) {
    console.log("getList -> data", data)

    let queryString = StringHelper.formatParamsToQueryString(data);
    
    return this.handleRequest(axios.get(`${this.baseUrl}${queryString}`, {
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