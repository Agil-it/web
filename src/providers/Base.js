import Cookies from 'universal-cookie';
import * as jwt from 'jsonwebtoken';

export class BaseProvider {

  constructor(moduleAPI) {
    this.module = moduleAPI
    this.baseUrl = `http://127.0.0.1:4000/api/v1/${this.module}`
    this.cookies = new Cookies();
  }

  getHeaders() {
    return {
      'Content-Type': 'application/json',
      'token': this.getToken()
    }
  }

  getToken() {
    return this.cookies.get('token')
  }

  setToken(token) {
    const user = jwt.decode(token);

    this.cookies.set('token', token, { path: '/' })
    this.cookies.set('user', user, { path: '/' })
  
  } 

  updateToken(response) {
    return response.headers.token
      && this.setToken(response.headers.token)
  }

  checkResponse(response) {
    if (response === undefined || response === null || typeof response !== 'object') {
      console.log("Não foi possível executar a requisição")
      throw new Error("Não foi possível executar a requisição")
    }

    let { data } = response
    if (!data.success) {
      // Retorno do request do axios
      console.log('!data.success')
      console.log(data)
      throw new Error(data.error.message? data.error.message : data.error)
    }

    if (data.data.success == false) {
      // Retorno do request do server
      console.log('!data.data.success')
      console.log(data.data)
      throw new Error(data.data.message || data.data.error)
    }
  }

  async handleRequest(callback) {
    try {
      const response = await callback;

      this.checkResponse(response)

      let atualizouToken = this.updateToken(response)
      console.log("TCL: BaseProvider -> get -> atualizouToken", atualizouToken)

      if (response.data.data !== undefined) {
        return response.data
      }

      return response;
    } catch (error) {
      console.log("TCL: handleRequest -> error", error)
      return {
        success: false,
        error: error
      }
    }
  }

  mountBetweenDate(dateFrom,dateTo, keepValues = false) {
    let dateTimeFrom,dateTimeTo;

    if (!keepValues) {
      dateTimeFrom = `${new Date(dateFrom).toISOString().split('T')[0]}T00:00:00`
      dateTimeTo = `${new Date(dateTo).toISOString().split('T')[0]}T23:59:59`
    } else {
      dateTimeFrom = dateFrom
      dateTimeTo = dateTo
    }

    return this.mountBetweenSetence(dateTimeFrom,dateTimeTo);
  }

  mountBetweenSetence(valueFrom,valueTo) {
    return `between(${valueFrom}, ${valueTo})`;
  }
}