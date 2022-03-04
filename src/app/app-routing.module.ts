import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainHeaderComponent } from './main-header/main-header.component';
import { ContactsHomeComponent } from './contacts-home/contacts-home.component';
import { DetailsComponent } from './details/details.component';


const routes: Routes = [
  {
    path: 'contacts',
    component: ContactsHomeComponent,
    data: { animation: 'ContactsHomePage' },
    children: [{
      path: 'details/:dob',
      component: DetailsComponent,
      data: { animation: 'ContactDetailsPage' }
    }]
  },
  { path: '', redirectTo: '/contacts', pathMatch: 'full' },
  { path: '**', component: ContactsHomeComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
