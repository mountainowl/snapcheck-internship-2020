import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserResolveServiceService implements Resolve<any>{

  constructor(private _userService: UserService) { }

  resolve(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<any> {
    return this._userService.getUser(route.paramMap.get('user_id'));
  }
}