import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { ContactsHomeComponent } from './contacts-home/contacts-home.component';
import { DetailsComponent } from './details/details.component';
import { ContactsListComponent } from './contacts-home/contacts-list/contacts-list.component';
import { ContactsSearchComponent } from './contacts-home/contacts-search/contacts-search.component';

@NgModule({
  declarations: [
    AppComponent,
    MainHeaderComponent,
    ContactsHomeComponent,
    DetailsComponent,
    ContactsListComponent,
    ContactsSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
