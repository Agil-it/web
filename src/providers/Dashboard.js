import { CrudProvider } from "./Crud";

export class DashboardProvider extends CrudProvider {

  constructor() {
    super('dashboards')
  }
}