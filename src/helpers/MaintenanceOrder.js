import { DateHelper } from './Date';
export class MaintenanceOrderHelper {

  static translate(prop, value) {
    var props;

    if (prop == "priority") props = this.getPriority();
    else if (prop == "status") props = this.getStatus();
    else if (prop == "color") props = this.getColorPriority();
    else if (prop == "layout") props = this.getLayoutType();
    else return value;

    return props[value];

  }

  static getLayoutType() {
    return {
      default: 'Corretiva | Preventiva',
      route: 'ROTA',
      list: 'LISTA',
    }
  }

  static getColorPriority() {
    return {
      low: "#03a140",
      medium: "#3177e8",
      high: "#ffd300",
      urgent: "red"
    }
  }

  static getPriority() {
    return {
      low: "Baixa",
      medium: "Média",
      high: "Alta",
      urgent: "Urgente"
    }
  }

  static getStatus() {
    return {
      created: "Aberta",
      assumed: "Assumida",
      started: "Iniciada",
      paused: "Pausada",
      stopped: "Parada",
      canceled: "Cancelada",
      "signature-pending": "Assinatura Pendente",
      signatured: "Assinada",
      finished: "Finalizada",
      "no_status": "Sem Status",
    }
  }

  static sortOrders(list) {
    var ordenatedPriority = this.ordenatedPriority();

    return list.sort((a, b) => {
      if (ordenatedPriority[a.priority] > ordenatedPriority[b.priority]) return -1;
      else if (ordenatedPriority[a.priority] < ordenatedPriority[b.priority]) return 1;

      var dateTimeA = DateHelper.getDate(a.openedDate).getTime();
      var dateTimeB = DateHelper.getDate(b.openedDate).getTime();

      if (dateTimeA > dateTimeB) return 1;
      else if (dateTimeA == dateTimeB) return 0;
      else return -1;

    })
  }

  static ordenatedPriority() {
    return {
      urgent: 3,
      high: 2,
      medium: 1,
      low: 0,
    }
  }
}