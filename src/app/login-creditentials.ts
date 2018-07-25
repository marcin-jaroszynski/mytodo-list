export class LoginCreditentials {
  login: string;
  password: string;
  validate() {
    if (this.login && this.password) {
      return true;
    }
    return false;
  }
}
