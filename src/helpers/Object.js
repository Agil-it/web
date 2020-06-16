export class ObjectHelper {

  static clearFields(obj, exclude = false) {
    for (const key in obj) {
      if (!obj.hasOwnProperty(key)) continue;
      if (exclude) {
        delete obj[key];
      } else {
        obj[key] = "";
      }
    }
  }

  static getPropertys (obj, path, defaultValue = undefined){
    const travel = regexp =>
      String.prototype.split
        .call(path, regexp)
        .filter(Boolean)
        .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj);
    const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
    
    return result === undefined || result === obj ? defaultValue : result;
  }
}