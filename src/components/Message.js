import React from 'react';
import ReactDOM from 'react-dom';
import ReactConfirmAlert, { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export class MessageModal {

  /**
   * 
   * Solicita confirmação ao usuário
   * 
   *  @Param title : string
   *  @Param mesage : string
   *  @Param confirmationCallBack : function
   */
  static confirmation(title = "Confirma?", message = "Confirma a ação?", confirmationCallBack) {

    confirmAlert({
      title: title,
      message: message,
      buttons: [
        {
          label: 'Não'
        },
        {
          label: 'Sim',
          onClick: confirmationCallBack
        }
      ],
    })
  };
  
  /**
   * 
   * Abre texto informativo ao usuário
   * 
   *  @Param title : string
   *  @Param mesage : string
   *  @Param confirmationCallBack : function
   */
  static information(title = "Informativo", message = "", callBack) {
    
    confirmAlert({
      title: title,
      message: message,
      buttons: [
        {
          label: 'OK',
          onClick: callBack
        }
      ],
      closeOnClickOutside: false,
      closeOnEscape: false
    });
  };
  
  /**
   * 
   * Abre texto informativo com lista ao usuário
   * 
   *  @Param title : string
   *  @Param message : string
   *  @Param arrayMessage : Array<string>
   *  @Param confirmationCallBack : function
   */
  static informationList(title = "Informativo", message, arrayMessage = [], callBack) {
    
    confirmAlert({
      title: title,
      message: message,
      childrenElement: () => (
        <div>
          <br></br>
          <ul>
            {arrayMessage.map(message => <li>{message.message || message.error || message}</li>)}
          </ul>
          <br></br>
        </div>
      ),
      buttons: [
        {
          label: 'OK',
          onClick: callBack
        }
      ],
      closeOnClickOutside: false,
      closeOnEscape: false
    });
  };
}