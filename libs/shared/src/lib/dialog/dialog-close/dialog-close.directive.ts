import { Directive, HostListener, Input } from '@angular/core';

import { DialogRef } from '../@types/dialog-ref';

@Directive({
  selector: '[pOneDialogClose]',
})
export class DialogCloseDirective {
  @Input()
  public data: any;

  constructor(private readonly _dialogRef: DialogRef) {}

  @HostListener('click')
  public click(): void {
    this._dialogRef.close(this.data);
  }
}
