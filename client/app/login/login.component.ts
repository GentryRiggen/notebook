import {Component} from 'angular2/core';
import {LoginService} from "./login.service";

@Component({
  selector: 'login',
  template: `
  <form (ngSubmit)="login()">
    <h1>Login</h1>
    <input type="text" name="username" [(ngModel)]="username"/>
    <input type="password" name="password" [(ngModel)]="password"/>
    <button type="submit">Login</button>
  </form>
  `,
  styles: [`
    form {
      width: 300px;
      margin: 25px auto;
      display: flex;
      flex-direction: column;
    }
    
    input {
      height: 30px;
      font-size: 15px;
      margin: 5px 0;
      padding: 0 15px;
    }
    
    button {
      height: 30px;
    }
  `]
})
export class LoginComponent {
  username: string;
  password: string;
  
  constructor(private _loginService: LoginService) {}
  
  login() {
    console.log('Login!', this.username, this.password);
    this._loginService.login(this.username, this.password)
      .subscribe(
        (user) => console.log(user)
      );
  }
}
