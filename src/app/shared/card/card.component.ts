import { Component, OnInit, Input } from '@angular/core';
import { Contact } from "../models/main-app-models";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})

export class CardComponent implements OnInit {
  @Input() contact: Contact;


  constructor() {

  }

  ngOnInit(): void {
  }

}
