import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'p-one-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  form = new UntypedFormGroup({
    name: new UntypedFormControl(''),
    email: new UntypedFormControl(''),
  });
}
