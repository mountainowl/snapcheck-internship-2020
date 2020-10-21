import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error = '';
  url=''


  constructor(private authenticationService: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { 

      this.authenticationService.logout();

    }

  ngOnInit(): void {  
    this.loginForm = this.formBuilder.group({
    username: [''],
    password: ['' ]
});
this.url = this.route.snapshot.queryParams['returnUrl'] || '/view-users';

  }

  onSubmit() {
        this.authenticationService.login(this.loginForm.controls.username.value, this.loginForm.controls.password.value)
        .pipe(first())
        .subscribe(
            data => {
                this.router.navigate([this.url]);
            },
            error => {
                this.error=error;

            });
}
}




