import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent }      from './auth/login/login.component';
import { RegisterComponent }      from './auth/register/register.component';
import { ApprovalComponent }      from './inventory/approval/approval.component';
import { ListComponent }      from './inventory/list/list.component';
import { AuthGuard } from './auth/guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'inventory-list', component: ListComponent, canActivate: [AuthGuard] },
  { path: 'product/:id', component: ApprovalComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
