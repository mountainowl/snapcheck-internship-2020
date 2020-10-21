import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import {Observable} from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _getAllUsersUrl =environment.apiUrl+'/users/all'
  private _getUserUrl=environment.apiUrl+'/users/'

  constructor(private _http: HttpClient) { }
   getAllUsers() 
   {
   return this._http.get(this._getAllUsersUrl)
        .pipe(map((response: Response) => (JSON.stringify(response))));
}
    getUser(id) 
    {
          return this._http.get(this._getUserUrl+id)
        .pipe(map((response: Response) => (JSON.stringify(response))));
}
saveUser(value,user_id) 
{
      value=(value)
      value={user_id,...value}
      return this._http.post(this._getUserUrl+'save',value)
    .pipe(map((response: Response) => (JSON.stringify(response))));
}
deleteUser(user_id) 
{
      return this._http.delete(this._getUserUrl+user_id)
    .pipe(map((response: Response) => (JSON.stringify(response))));
}
}
