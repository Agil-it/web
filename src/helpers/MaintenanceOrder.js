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

  static getLayoutType(){
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
      Signatured: "Assinada",
      finished: "Finalizada",
    }
  }
}