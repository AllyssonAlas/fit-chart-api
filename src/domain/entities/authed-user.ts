export class AuthedUser {
  name: string;
  email: string;
  authToken: string;

  constructor(data: AuthedUser) {
    this.name = data.name;
    this.email = data.email;
    this.authToken = data.authToken;
  }
}
