import { CrudProvider } from "./Crud";

export class UserProvider extends CrudProvider {

 constructor() {
  super('users')
 }
}