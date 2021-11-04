import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface DialogState {
  isLoading?: boolean | null;
}
@Component({
  selector: 'p-one-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  private readonly _state$ = new BehaviorSubject<DialogState>({
    isLoading: false,
  });

  public readonly isLoading$ = this._state$.pipe(
    map((state) => state.isLoading)
  );

  @Input()
  set isLoading(isLoading: boolean | undefined | null) {
    this._setState({
      isLoading,
    });
  }
  constructor() {}

  ngOnInit(): void {}

  private _setState(state: Partial<DialogState>) {
    this._state$.next({
      ...this._state$.value,
      ...state,
    });
  }
}
