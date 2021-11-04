import { ComponentPortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { DialogOptions, PONE_DIALOG_CONTENT, PONE_DIALOG_OPTIONS } from '../@types/dialog-options';

export interface DialogContainerState {
  portal: ComponentPortal<any>;
  options: DialogOptions;
}

@Component({
  selector: 'p-one-dialog-container',
  templateUrl: './dialog-container.component.html',
  styleUrls: ['./dialog-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogContainerComponent implements OnInit {
  private readonly _state$ = new BehaviorSubject<DialogContainerState>({
    portal: this._content,
    options: this._dialogOptions,
  });

  public readonly portal$ = this._state$.pipe(map((state) => state.portal));
  public readonly options$ = this._state$.pipe(map((state) => state.options));
  public readonly minWidth$ = this.options$.pipe(
    map((options) => options?.minWidth ?? '500px')
  );

  constructor(
    @Inject(PONE_DIALOG_CONTENT)
    private readonly _content: ComponentPortal<unknown>,

    @Inject(PONE_DIALOG_OPTIONS)
    private readonly _dialogOptions: DialogOptions
  ) {}

  ngOnInit(): void {}
}
