import { Injectable, Pipe } from "@angular/core";

@Pipe({
  name: "phone",
})
export class PhonePipe {
  transform(tel: string) {
    if (tel) {
      let country, city, number;
      switch (tel.length) {
        case 10:
          country = 1;
          city = tel.slice(0, 3);
          number = tel.slice(3);
          break;

        case 11:
          country = tel.slice(0, 1);
          city = tel.slice(1, 4);
          number = tel.slice(4);
          break;

        case 12:
          country = tel.slice(0, 3);
          city = tel.slice(3, 5);
          number = tel.slice(5);
          break;

        default:
          return tel;
      }

      if (country === 1) {
        country = "";
      }

      number = `${number.slice(0, 3)}-${number.slice(3)}`;

      return `${country}(${city}) ${number}`;
    }
    else {
      return tel;
    }
  }
}
