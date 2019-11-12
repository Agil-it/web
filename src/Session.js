const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);

export class Session {

 constructor() {
  const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);

  this.cookies = cookies
  this.setCookie = setCookie
  this.removeCookie = removeCookie
 }
 public static setToken(jwt) {
  this.setCookie("JWT", jwt, {
   httpOnly: true,
   sameSite: 'strict'
  })
 }
}