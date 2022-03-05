import { Component, OnInit } from '@angular/core';
import { ContactStateService } from '../../shared/services/contact-state.service';
import { Contact } from '../../shared/models/main-app-models';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss']
})
export class ContactsListComponent implements OnInit {
  contacts: Contact[] = [];

  constructor(private contactStateService: ContactStateService) { }

  ngOnInit(): void {
    this.contactStateService.getContacts$().subscribe(
      (resp: Contact[]) => this.contacts = resp
    )
  }

}
