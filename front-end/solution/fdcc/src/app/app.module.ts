import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ViewUsersComponent } from './view-users/view-users.component';
import {AmountPipe} from './pipes/custom-currency.pipe';
import { ModifyUserComponent } from './modify-user/modify-user.component';
import { NavbarComponent } from './navbar/navbar.component'
import { UserResolveServiceService } from './resolvers/user-resolve-service.service';
import { CustomSearchPipe } from './pipes/custom-search.pipe';
import { AddressPipe } from './pipes/address.pipe';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ViewUsersComponent,
    AmountPipe,
    ModifyUserComponent,
    NavbarComponent,
    CustomSearchPipe,
    AddressPipe,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule

  ],
  providers: [UserResolveServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
