import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactStateService } from '../../shared/services/contact-state.service';
import { fromEvent, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  tap
} from 'rxjs/operators';

@Component({
  selector: 'app-contacts-search',
  templateUrl: './contacts-search.component.html',
  styleUrls: ['./contacts-search.component.scss']
})
export class ContactsSearchComponent implements OnInit {
  searchForm = this.formBuilder.group({
    searchInput: ''
  });
  constructor(
    private contactStateService: ContactStateService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.searchForm.valueChanges.pipe(
      debounceTime(200),
      map((data) => data.searchInput),
      distinctUntilChanged(),
      switchMap(string => of(this.contactStateService.setFilteredContacts(string))),
    ).subscribe();
  }

  addNewContact() {
    this.router.navigate(['/', 'editContact', true]);
  }

}
