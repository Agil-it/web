import { CrudProvider } from "./Crud";

export class MaintenanceOrderProvider extends CrudProvider {

    constructor() {
        super('maintenance-orders')
    }
}