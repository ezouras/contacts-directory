import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Contact } from "../shared/models/main-app-models";
import { ContactStateService } from "../shared/services/contact-state.service"
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  contact: Contact;
  contactForm: FormGroup;
  formError: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private contactStateService: ContactStateService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.contact = this.contactStateService.getContactById(id);
      this.createContactForm()
    }
  }

  createContactForm() {
    this.contactForm = this.fb.group({
      firstname: [this.contact.first, Validators.required],
      lastname: [this.contact.last, Validators.required],
      email: [this.contact.email, Validators.required],
      phone: [this.contact.phone, Validators.required],
      dob: [this.contact.dob]
    });
  }

  contactFormSubmit(formValues: any) {
    console.log("form is ", formValues)
  }

}
