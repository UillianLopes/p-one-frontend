import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'p-one-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
})
export class OptionComponent implements OnInit {
  @ViewChild(TemplateRef, { static: true })
  public template!: TemplateRef<any>;

  @Input()
  public value: any;
  
  constructor() {}

  ngOnInit(): void {}
}
