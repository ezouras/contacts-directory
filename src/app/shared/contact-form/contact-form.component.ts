import { Component, ElementRef, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Contact } from "../models/main-app-models";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactStateService } from "../services/contact-state.service";
@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  contactForm: FormGroup;
  formError: boolean = false;
  errorMessage: string = "";
  formsOfContact = "email address phone";
  fullNameCondition = "first last";
  isNew: boolean = false;
  contact: Contact;

  constructor(
    private fb: FormBuilder,
    private contactStateService: ContactStateService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('isNew');
    this.isNew = param === "true";
    if (!this.isNew) {
      this.contact = this.contactStateService.getSelectedContactValue()
    }
    this.createContactForm()
  }

  createContactForm() {
    this.contactForm = this.fb.group({
      first: [this.getFormControlValue("first"), Validators.required],
      last: [this.getFormControlValue("last"), Validators.required],
      address: [this.getFormControlValue("address"), Validators.required],
      email: [this.getFormControlValue("email"), [Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      phone: [this.getFormControlValue("phone"), Validators.required],
      dob: [this.getFormControlValue("dob")]
    });
  }

  getFormControlValue(contactKeyName: string): string {
    return this.isNew ? "" : (this.contact as any)[contactKeyName];



  }

  contactFormSubmit(formValues: any) {
    const keys = Object.keys(this.contactForm.controls)
    const invalidKeys = keys.filter(key => this.contactForm.controls[key].status === "INVALID")
    this.isFormValid(invalidKeys) ? this.createNewContact(formValues) : this.sendUserMessage(invalidKeys);
  }

  isFormValid(invalidKeys: string[]) {
    return this.contactForm.pristine ? false :
      this.hasFullName(invalidKeys) && this.hasFormOfContact(invalidKeys) ? true : false;

  }


  sendUserMessage(invalidKeys: string[]) {
    let message = this.hasFullName(invalidKeys) ? "" : "must include a first and last name ";
    message = this.hasFormOfContact(invalidKeys) ? `${message}` : `${message} must include either email, phone or address`;
    this.contactForm.pristine ? alert("No change made") : alert(message)

  }

  hasFullName(invalidKeys: string[]) {
    const noFullName = this.fullNameCondition.split(" ").some(name => invalidKeys.includes(name))
    return !noFullName
  }

  hasFormOfContact(invalidKeys: string[]) {
    const noFormOfContact = this.formsOfContact.split(" ").every(contact => {
      return invalidKeys.indexOf(contact) === -1 ? false : true;
    })
    return !noFormOfContact;
  }


  createNewContact(formValues: any) {
    this.isNew ?
      this.contactStateService.addContact(formValues)
      : this.contactStateService.editContact(this.contact, formValues)
    this.routeToMain();
  }

  routeToMain() {
    this.router.navigate(['/', 'contacts']);
  }



}
