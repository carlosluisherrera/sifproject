import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent }      from './auth/login/login.component';
import { RegisterComponent }      from './auth/register/register.component';
import { ApprovalComponent }      from './inventory/approval/approval.component';
import { ListComponent }      from './inventory/list/list.component';
import { AuthGuard } from './auth/guard';
import { SearchComponent } from 'src/app/inventory/search/search.component';
import { ControlPanelComponent } from 'src/app/auth/control-panel/control-panel.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'inventory-list', component: ListComponent, canActivate: [AuthGuard] },
  { path: ':phase/:category/:id', component: ApprovalComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'search', component: SearchComponent},
  { path: 'control-panel', component: ControlPanelComponent }
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
