import { StringHelper } from "./String";

export class DateHelper {

  static formatDate(inputDate) {
    var date = this.getDate(inputDate);    

    var day = StringHelper.JustifyLeft(date.getDate(), 2, 0);
    var month = StringHelper.JustifyLeft(date.getMonth() + 1, 2, 0);
    var year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  static formatDateTime(inputDate) {
    var date = this.getDate(inputDate);

    var day = StringHelper.JustifyLeft(date.getDate(), 2, 0);
    var month = StringHelper.JustifyLeft(date.getMonth() + 1, 2, 0);
    var year = date.getFullYear();
    var hour = date.getHours();
    var minutes = date.getMinutes();

    return `${day}/${month}/${year} às ${hour}h${minutes}`;
  }
  
  static formatTime(inputDate, outputFormat = 'time') {
    var date = this.getDate(inputDate);

    var hour = date.getHours();
    var minutes = StringHelper.JustifyLeft(date.getMinutes(), 2, 0);

    if (outputFormat = 'time') {
      return `${hour}: ${minutes}`;
    } else if(outputFormat = 'reduced') {
      return `${hour}h${minutes}`;
    } else {
      return `${hour} horas e ${minutes} minutos`;
    }
  }

  static convertMinuteToHour(inputMinutes) {
    const convertedMinutes = Number(inputMinutes);

    if (Number.isNaN(convertedMinutes)) {
      return '';
    }

    let hours = (convertedMinutes / 60);
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
        
    const formatedHours = rhours.toString().padStart(2, '0');
    const formatedMinutes = rminutes.toString().padStart(2, '0');

    return `${formatedHours}: ${formatedMinutes}`;
  }

  static getDate(date){
    if (typeof date == "object") return date;
    
    return new Date(date);
  }
}