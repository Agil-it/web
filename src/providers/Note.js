import { CrudProvider } from "./Crud";

export class NoteProvider extends CrudProvider {

 constructor() {
  super('default-observations')
 }
}