import { CrudProvider } from './Crud'
import { StringHelper } from '../helpers/String'
import { MessageModal } from '../components/Message'

export class HandlerProvider {

  constructor(provider, entityName) {
    
    if (!(provider instanceof CrudProvider)) {
      throw new Error("Provider inválido! deveria ser uma instancia do CrudProvider")
    }

    this.provider = provider
    this.entityName = entityName
  }

  save(object, successCallBack) {
    let id = Number(object.id)
    let alreadyRegistered = (typeof id == "number" && id > 0)
    if (!alreadyRegistered) {
      delete object.id
    }

    let action = alreadyRegistered? "atualizar" : "cadastrar"
    let title = StringHelper.FirstLetterUpperCase(`${action} ${this.entityName}?`)

    //MessageModal.confirmation(title, "Confirma a ação?",this.execute(callback, action, successCallBack))

    if (alreadyRegistered) {
      //MessageModal.confirmation(title, "Confirma a ação?", async () => {this.execute(this.provider.update(id,object), action, successCallBack)})
      this.execute(this.provider.update(id,object), action, successCallBack)
    } else {
      this.execute(this.provider.create(object), action, successCallBack)
      //MessageModal.confirmation(title, "Confirma a ação?", async () => {this.execute(this.provider.create(object), action, successCallBack)})
    }
  }

  async get(id){
    try {
      let response = await this.provider.get(id);
      return response;
    } catch (error) {
      return error.message;
    }

  }

  delete(id, successCallBack) {
    
    try {
      id=Number(id)
    } catch (error) {
      return
    }

    if (typeof id !== "number" || id < 1) {
      return
    }

    let title = `Deletar ${StringHelper.FirstLetterUpperCase(this.entityName)}?`
    MessageModal.confirmation(title, "Confirma a ação?", async() => {this.execute(this.provider.delete(id), "deletar", successCallBack)})
  }

  async deleteObject(id) {
    
    id = Number(id);

    if (typeof id !== "number" || id < 1) {
      throw Error('ID Inválido!')
    }
    
    try {
      const response = await this.provider.delete(id);
      if (!response.success)
        throw response.error;

      return true;
    } catch(err) {
      return false;
    }
  }

  async getList(data){

    try {
      let response = await this.provider.getList(data);
      return response;
    } catch (error) {
      return [];
    }
  }

  async execute(functionToExecute, action, successCallBack) {

    if (action === "cadastrar") {
      action = "cadastrado"
    } else if(action === "atualizar") {
      action = "atualizado"
    } else if(action === "deletar") {
      action = "deletado"
    } else {
      action = ""
    }

    let response = null

    try {
      response = await functionToExecute
    } catch (error) {
      console.log("TCL: HandlerProvider -> execute -> error", error)
    }

    let title = '⚠ Erro'
    
    if (response === undefined) {
      
      MessageModal.information(title, "Ocorreu um erro! se persistir fazer entrar em contato com o departamento de TI.",() => console.log('error'))
      
    } else if (!response.success) {

      let arrayOfMessage = []

      if (response.error instanceof Array) {
        response.error.forEach(error => {
          arrayOfMessage.push(error)
        });
      } else {
        arrayOfMessage.push(response.error)
      }

      MessageModal.informationList(title, "Ocorreram erros ao executar a ação:", arrayOfMessage,() => console.log('error'))
      
    } else {
      title = '✔ Sucesso'
      MessageModal.information(title, StringHelper.FirstLetterUpperCase(`${this.entityName} ${action} com sucesso!`), successCallBack(response.data))
    }
  }
}