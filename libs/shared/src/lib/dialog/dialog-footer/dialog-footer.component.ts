import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'p-one-dialog-footer',
  templateUrl: './dialog-footer.component.html',
  styleUrls: ['./dialog-footer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'p-one-dialog__footer card-footer',
  },
})
export class DialogFooterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
