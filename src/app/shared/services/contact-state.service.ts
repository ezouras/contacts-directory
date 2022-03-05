import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Contact } from '../../shared/models/main-app-models';
import { contacts } from '../../../assets/contacts';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})

export class ContactStateService {
  private contacts: Contact[];
  private contactsB$: BehaviorSubject<Contact[]>;
  private contacts$: Observable<Contact[]>;
  private selectedContactB$: BehaviorSubject<Contact>;
  private selectedContact$: Observable<Contact>;
  private filteredContacts: Contact[];


  constructor() {
    this.contacts = this.inititialzeAndGetContacts(contacts.slice());
    this.contactsB$ = new BehaviorSubject<Contact[]>(this.contacts);
    this.selectedContactB$ = new BehaviorSubject<Contact>(this.contacts[0]);
    this.selectedContact$ = this.selectedContactB$.asObservable();
    this.contacts$ = this.contactsB$.asObservable();
    this.filteredContacts = this.contacts;
  }

  inititialzeAndGetContacts(assetContacts: any): Contact[] {
    return assetContacts.map((contact: any, index: number) => {
      return { ...contact, isSelected: false, isFavorite: false, id: index.toString() }
    })
  }

  getSelectedContact$(): Observable<Contact> {
    return this.selectedContact$;
  }
  getSelectedContactValue(): Contact {
    return this.selectedContactB$.value;
  }

  getContactById(id: string): Contact {
    return this.contactsB$.value.filter(contact => contact.id === id)[0]

  }


  setSelectedContact(contact: Contact) {
    //unselect current contact
    this.selectedContactB$.value.isSelected = false;
    //set new contact
    this.selectedContactB$.next(contact)
    this.selectedContactB$.value.isSelected = true;
  }


  getContacts$(): Observable<Contact[]> {
    return this.contacts$;
  }

  /*getFilteredContacts(searchStr: string): Contact[] {
    let filteredContacts: Contact[] = [];
    this.contacts.forEach((contact: Contact) => {
      for (const contactKey in contact) {
        const value = contact[contactKey as keyof contact]
        if (typeof value === 'string') {
          if (value.toLowerCase().includes(searchStr.toLowerCase())) {
            if (!_.includes(filteredContacts, contact)) {
              filteredContacts.push(contact);
            }
          }
        }
      }
    })
    return filteredContacts;

}*/

}
