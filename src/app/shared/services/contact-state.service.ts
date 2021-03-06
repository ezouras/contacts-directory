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
  private inputSearchString: string = "";


  constructor() {
    this.contacts = this.inititialzeAndGetContacts(contacts.slice());
    this.contactsB$ = new BehaviorSubject<Contact[]>(this.contacts);
    this.contacts$ = this.contactsB$.asObservable();
    this.selectedContactB$ = new BehaviorSubject<Contact>(this.contacts[0]);
    this.selectedContact$ = this.selectedContactB$.asObservable();
    this.filteredContacts = this.contacts;
  }

  inititialzeAndGetContacts(assetContacts: any): Contact[] {
    const initializedAssets = assetContacts.map((contact: any, index: number) => {
      return { ...contact, isSelected: false, isFavorite: false, id: index.toString() }
    })
    this.sortContactByLastName(initializedAssets)
    return initializedAssets;
  }

  sortContactByLastName(contacts: Contact[]) {
    contacts.sort((a: Contact, b: Contact) => {
      const aLast = a.last.toLowerCase();
      const bLast = b.last.toLowerCase();
      return aLast < bLast ? -1 :
        aLast > bLast ? 1 : 0;
    });
  }

  setInputSearchData(inputSearchString: string) {
    this.inputSearchString = inputSearchString;
  }

  getLastInputSearchData(): string {
    return this.inputSearchString;
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
  getContactsValue(): Contact[] {
    return this.contactsB$.value;
  }

  editContact(oldContact: Contact, newValues: any) {
    this.contacts = this.contacts.map(contact => {
      if (oldContact.id === contact.id) {
        contact = { ...oldContact, ...newValues };
      }
      return contact
    })
    this.sortContactByLastName(this.contacts);
    this.setInputSearchData("");
    this.contactsB$.next(this.contacts)
  }

  addContact(contactValues: any) {
    const id = this.contactsB$.value.length.toString();
    const newContact: Contact = { ...contactValues, isSelected: false, isFavorite: false, id }
    this.contacts.push(newContact)
    this.sortContactByLastName(this.contacts);
    this.setInputSearchData("");
    this.contactsB$.next(this.contacts)

  }

  setFilteredContacts(searchStr: string) {
    let filteredContacts: Contact[] = [];
    searchStr = searchStr.toLowerCase();
    this.contacts.forEach((contact: Contact) => {
      const first = contact.first.toLowerCase().includes(searchStr);
      const last = contact.last.toLowerCase().includes(searchStr);
      if (first || last) {
        filteredContacts.push(contact)
      }
    })

    this.contactsB$.next(filteredContacts);

  }

}
