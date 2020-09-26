import { MessageModal } from '../components/Message'
import { StringHelper } from './String'

export class ProviderHelper {

  
  static async execute(functionToExecute, action, successCallBack, returnResult) {

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
      console.log("TCL: ProviderHelper -> execute -> error", error)
    }

    let title = '⚠ Erro'
    
    if (response === undefined) {
      
      MessageModal.information(title, "Ocorreu um erro! se persistir fazer entrar em contato com o departamento de TI.",() => console.log('error: response undefined!'))
      
    } else if (!response.success) {

      let arrayOfMessage = []

      if (response.error instanceof Array) {
        response.error.forEach(error => {
          arrayOfMessage.push(error)
        });
      } else {
        arrayOfMessage.push(response.error)
      }

      if (returnResult === true) throw arrayOfMessage;

      MessageModal.informationList(title, "Ocorreram erros ao executar a ação:", arrayOfMessage,() => console.log('error'))
      
    } else {
      if (returnResult === true) return response.data;

      title = '✔ Sucesso'
      MessageModal.information(title, StringHelper.FirstLetterUpperCase(`${this.entityName} ${action} com sucesso!`), () => typeof successCallBack === 'function' ? successCallBack(response.data) : undefined)
    }
  }
}