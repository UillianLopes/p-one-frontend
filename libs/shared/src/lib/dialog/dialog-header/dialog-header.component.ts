import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'p-one-dialog-header,*[p-one-dialog-header]',
  templateUrl: './dialog-header.component.html',
  styleUrls: ['./dialog-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'p-one-dialog__header card-header',
  },
})
export class DialogHeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
