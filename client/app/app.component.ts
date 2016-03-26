import {Component, OnInit} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';

// Services
import {UserService} from './common/user.service';
import {LoginService} from './login/login.service';

// Directives
import {HeaderNavComponent} from './header/headerNav.component';
import {LoginComponent} from './login/login.component';

@Component({
  selector: 'app',
  template: `
    <div class="wrapper">
      <login *ngIf="!user"></login>
      <header-nav *ngIf="user"></header-nav>
      <div *ngIf="user" style="margin-top: 64px;">
        <p>USER: {{user | json}}</p>
        <p>ERROR: {{error | json}}</p>
      </div>
    </div>
    `,
  directives: [
    LoginComponent,
    HeaderNavComponent
  ],
  providers: [
    HTTP_PROVIDERS,
    LoginService,
    UserService
  ]
})
export class AppComponent implements OnInit {
  user:any;
  error:any;

  constructor(private _userService:UserService) {
  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    console.log('Getting user');
    this._userService.getCurrentUser()
      .subscribe(
        (user) => this.user = user,
        (error) => this.error = error
      );
  }
}
