import Cookies from 'universal-cookie';

export class SessionHelper {

  static getCookieData(name) {
    return new Cookies().get(name)
  }
}