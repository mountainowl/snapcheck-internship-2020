import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import {FormsModule, Form} from '@angular/forms';
import { User } from '../models/user';
import { NgForm } from '@angular/forms';
import { Router, ParamMap } from '@angular/router';
declare var $: any; 

@Component({
  selector: 'app-modify-user',
  templateUrl: './modify-user.component.html',
  styleUrls: ['./modify-user.component.css']
})
export class ModifyUserComponent implements OnInit {
  status:any=true;
  
  user:User;
  id:string;
  currency:string
  constructor(private _userService: UserService, private http: HttpClient,
    private route: ActivatedRoute,  private router: Router ) { }
    
  ngOnInit(): void {
    this.user = JSON.parse(this.route.snapshot.data.user);
    this.id =  this.user.user_id;
    this.currency =this.user.order_total.currency;

  }

  async onSubmit(value: NgForm) {
    $("#saveModal").modal("hide");
    await this._userService.saveUser(value,this.id).subscribe(x=>console.log(x))
    this.router.navigate(['/view-users']);

  }
  async onDelete(){
    $("#deleteModal").modal("hide");
    await this._userService.deleteUser(this.id).subscribe(x=>console.log(x))
    this.router.navigate(['/view-users']);


  }

}
