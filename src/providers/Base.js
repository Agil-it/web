import axios from 'axios';
import Cookies from 'universal-cookie';

export class BaseProvider {

 constructor(moduleAPI) {
  this.module = moduleAPI
  this.baseUrl=`http://127.0.0.1:4000/api/v1/${this.module}`
  this.cookies = new Cookies();
 }

 async get(id) {
  try {
   
  const response = await axios.get(`${this.baseUrl}/${id}`, {
    headers: this.getHeaders()
  });
  console.log("TCL: BaseProvider -> get -> response", response)
  return response;

  } catch (error) {
   console.log(error)
   return error
  }
 }
  
 async getList() {
  try {
   const response = await axios.get(`${this.baseUrl}`, {
    headers: this.getHeaders()
   });
   console.log("TCL: BaseProvider -> getList -> response", response)
   return response;
   } catch (error) {
   console.log(error)
   return error
  }
 }

 async create(obj) {
  try{
   const response = await axios.post(`${this.baseUrl}`,{ obj }, {
    headers: this.getHeaders()
   });
   console.log("TCL: BaseProvider -> create -> response", response)
   return response;
   } catch (error) {
   console.log(error)
   return error
  }
 }

 async update(id, obj){
  try{
   const response = await axios.patch(`${this.baseUrl}/${id}`, { obj }, {
    headers: this.getHeaders()
   });
   console.log("TCL: BaseProvider -> update -> response", response)
   return response.json();
   } catch (error) {
   console.log(error)
   return error
  }
 }

 async delete(id) {
  try{
   const response = await axios.delete(`${this.baseUrl}/${id}`, {
      headers: this.getHeaders()
    });
   console.log("TCL: BaseProvider -> delete -> response", response)
   return response.json();
   } catch (error) {
   console.log(error)
   return error
  }
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
}