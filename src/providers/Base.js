import axios from 'axios';

export class BaseProvider {

 constructor(moduleAPI) {
  this.module = moduleAPI
  this.baseUrl=`http://127.0.0.1:4000/api/v1/${this.module}`
  console.log("TCL: BaseProvider -> constructor -> this.module", this.module)
  console.log("TCL: BaseProvider -> constructor -> this.baseUrl", this.baseUrl)
 }

 async get(id) {
  try {
   
  const response = await axios.get(`${this.baseUrl}/${id}`);
  console.log("TCL: BaseProvider -> get -> response", response)
  return response;

  } catch (error) {
   console.log(error)
   return error
  }
 }
  
 async getList() {
  try {
   const response = await axios.get(`${this.baseUrl}`)
   console.log("TCL: BaseProvider -> getList -> response", response)
   return response;
   } catch (error) {
   console.log(error)
   return error
  }
 }

 async create(obj) {
  try{
   const response = await axios.post(`${this.baseUrl}`,{ obj })
   console.log("TCL: BaseProvider -> create -> response", response)
   return response;
   } catch (error) {
   console.log(error)
   return error
  }
 }

 async update(id, obj){
  try{
   const response = await axios.patch(`${this.baseUrl}/${id}`, { obj })
   console.log("TCL: BaseProvider -> update -> response", response)
   return response.json();
   } catch (error) {
   console.log(error)
   return error
  }
 }

 async delete(id) {
  try{
   const response = await axios.delete(`${this.baseUrl}/${id}`);
   console.log("TCL: BaseProvider -> delete -> response", response)
   return response.json();
   } catch (error) {
   console.log(error)
   return error
  }
 }
}