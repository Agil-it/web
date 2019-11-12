import Cookies from 'universal-cookie';

export class BaseProvider {

 constructor(moduleAPI) {
  this.module = moduleAPI
  this.baseUrl=`http://127.0.0.1:4000/api/v1/${this.module}`
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
    this.cookies.set('token', token, { path: '/' })
 }

 updateToken(response) {
  return response.headers.token
    && this.setToken(response.headers.token)
 }
}