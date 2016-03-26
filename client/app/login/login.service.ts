import {Injectable} from 'angular2/core';
import {Http, Response, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Rx';

import {CONFIG} from '../config';

@Injectable()
export class LoginService {
  constructor(private _http:Http) {
  }

  login(username, password) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post(
      CONFIG.baseUrls.login,
      JSON.stringify({username: username, password: password}),
      {headers: headers}
      )
      .map((response:Response) => response.json())
      .catch(this.handleError);
  }

  handleError(error:Response) {
    return Observable.throw(error.json().error || 'Server Error!');
  }
}
