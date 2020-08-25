import { CrudProvider } from "./Crud";

export class OrderOperationProvider extends CrudProvider {

  constructor() {
    super('order-operations')
  }
}