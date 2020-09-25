
export class UserHelper {

  static translate(prop, value) {
    var props;

    if (prop == "role") props = this.getRole();
    else if (prop == "gender") props = this.getGender();
    else return value;

    return props[value];

  }

  static getRole(){
    return {
      administrator: "Administrador",
      sector_leader: "Líder de Setor", 
      maintainer_leader: "Líder de Manutenção",
      maintainer: "Técnico",
      user: "Usuário",
    }
  }

  static getGender() {
    return {
      male: 'Masculino',
      female: "Feminino"
    }
  }
}