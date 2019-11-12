import axios from 'axios';
import { BaseProvider } from "./Base";

export class CrudProvider extends BaseProvider {

  constructor(moduleAPI) {
    super(moduleAPI)
  }

  async get(id) {
    try {

      const response = await axios.get(`${this.baseUrl}/${id}`, {
        headers: this.getHeaders()
      });
      console.log("TCL: BaseProvider -> get -> response", response)

      let atualizouToken = this.updateToken(response)
      console.log("TCL: BaseProvider -> get -> atualizouToken", atualizouToken)

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

  async getList() {
    try {
      const response = await axios.get(`${this.baseUrl}`, {
        headers: this.getHeaders()
      });
      console.log("TCL: BaseProvider -> getList -> response", response)

      let atualizouToken = this.updateToken(response)
      console.log("TCL: BaseProvider -> get -> atualizouToken", atualizouToken)

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

  async create(obj) {
    try {
      const response = await axios.post(`${this.baseUrl}`, { obj }, {
        headers: this.getHeaders()
      });
      console.log("TCL: BaseProvider -> create -> response", response)

      let atualizouToken = this.updateToken(response)
      console.log("TCL: BaseProvider -> get -> atualizouToken", atualizouToken)

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

  async update(id, obj) {
    try {
      const response = await axios.patch(`${this.baseUrl}/${id}`, { obj }, {
        headers: this.getHeaders()
      });
      console.log("TCL: BaseProvider -> update -> response", response)

      let atualizouToken = this.updateToken(response)
      console.log("TCL: BaseProvider -> get -> atualizouToken", atualizouToken)

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

  async delete(id) {
    try {
      const response = await axios.delete(`${this.baseUrl}/${id}`, {
        headers: this.getHeaders()
      });
      console.log("TCL: BaseProvider -> delete -> response", response)

      let atualizouToken = this.updateToken(response)
      console.log("TCL: BaseProvider -> get -> atualizouToken", atualizouToken)

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