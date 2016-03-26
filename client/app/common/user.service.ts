import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import { Observable } from 'rxjs/Rx';

import {CONFIG} from '../config';

@Injectable()
export class UserService {
  constructor (private _http: Http) { }

  getCurrentUser() {
    return this._http.get(CONFIG.baseUrls.user)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  handleError(error: Response) {
    // console.error(error);
    return Observable.throw(error.json().error || 'Server Error!');
  }
}
