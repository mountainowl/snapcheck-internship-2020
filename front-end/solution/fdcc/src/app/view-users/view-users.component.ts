import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {
  searchKey:string;
  data:any;
  users:any;
 constructor(private _userService: UserService, private http: HttpClient,
  private route: ActivatedRoute) { }
  async ngOnInit() {
     await this._userService.getAllUsers()
     .subscribe(resUserData => 
       {
         this.data= JSON.parse(resUserData)
         this.users=this.data
       });
  }
}
