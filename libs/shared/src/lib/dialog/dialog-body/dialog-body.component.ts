import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'p-one-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrls: ['./dialog-body.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'card-body p-one-dialog__body',
  },
})
export class DialogBodyComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
