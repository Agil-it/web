export class StringHelper {

  static FirstLetterUpperCase(text, allWords = true) {

    if (!allWords) {
      if (text.length < 3) {
        return text.toLocaleLowerCase()
      }

      let firstLetter = text.substr(0, 1).toLocaleUpperCase()
      return `${firstLetter}${text.substr(1).toLocaleLowerCase()}`
    }

    let wordsArray = text.split(" ")

    return wordsArray.map(word => {
      if (word.length < 3) {
        return word.toLocaleLowerCase()
      }
      return `${word.substr(0, 1).toLocaleUpperCase()}${word.substr(1).toLocaleLowerCase()}`
    }).join(' ');
  }

  static JustifyLeft(value, size, characterToFit = "") {

    if (typeof value != "string") value = value.toString();

    return value.padStart(size, characterToFit);
  }

  static formatParamsToQueryString(params) {
    var queryString;
    queryString = new URLSearchParams(params).toString();

    if (queryString != "") queryString = `?${queryString}`;

    return queryString;
  }

  static backgroundModal() {
    return {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 10,
    }
  }

  static styleMessage() {
    return {
      backgroundColor: "#424242",
      position: "absolute",
      zIndex:10,
      right: "-30%",
      width:"25%",
      padding:5,
      color: "white",
      textAlign:'center',
      bottom: 0,
      zIndex: 10,
      fontSize: "1vw",
      height:50,
      borderRadius:5
    }
  }
}
