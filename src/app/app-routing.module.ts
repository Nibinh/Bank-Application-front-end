import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component'
import {DashboardComponent} from './dashboard/dashboard.component'
import { HomepageComponent } from './homepage/homepage.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  //login
  {
    path:'',component:LoginComponent
  },
  //register
  {
    path:'register',component:RegisterComponent
  },
  //dashboard
  {
    path:'dashboard',component: DashboardComponent
  },
  
  {
    path:'transactions',component:TransactionsComponent
  },
  // PageNotFoundComponent
  {
    path:'**',component:PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
