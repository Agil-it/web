export class ObjectHelper {

  static clearFields(obj, exclude = false) {
    for (const key in obj) {
      if (exclude) {
        delete obj[key];
      } else {
        obj[key] = "";
      }
    }
  }
}