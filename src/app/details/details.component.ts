import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Contact } from "../shared/models/main-app-models";
import { ContactStateService } from "../shared/services/contact-state.service"
import { Location } from '@angular/common'

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  contact: Contact;
  editMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactStateService: ContactStateService,
    private location: Location
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.contact = this.contactStateService.getContactById(id);
      this.contactStateService.setSelectedContact(this.contact)
    }

  }

  back() {
    this.location.back()
  }
  routeToEdit() {
    this.router.navigate(['/', 'editContact', false]);
  }


}
