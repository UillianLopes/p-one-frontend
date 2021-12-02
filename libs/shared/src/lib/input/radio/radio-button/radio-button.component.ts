import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { v4 } from 'uuid';

import { RadioStore } from '../radio.store';

@Component({
  selector: 'p-one-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
})
export class RadioButtonComponent implements OnInit {
  public readonly id = v4();

  @Input()
  public value?: any;

  @ViewChild(TemplateRef, { static: true })
  public template?: TemplateRef<any>;

  constructor(private readonly _store: RadioStore) {}

  ngOnInit(): void {}
}
