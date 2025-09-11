import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule }    from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './services/in-memory-data.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ListComponent } from './inventory/list/list.component';
import { ApprovalComponent } from './inventory/approval/approval.component';
import { HeaderComponent } from './structural/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { SearchComponent } from './inventory/search/search.component';
import { ControlPanelComponent } from './auth/control-panel/control-panel.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MessagesComponent } from './services/messages/messages.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ListComponent,
    ApprovalComponent,
    HeaderComponent,
    SearchComponent,
    ControlPanelComponent,
    MessagesComponent
  ],
  imports: [    
    NgbModule,
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule,
    HttpClientModule,
  NgScrollbarModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
