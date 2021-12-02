import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import * as _ from 'lodash';

export interface MultipleAutocompleteState {
  value: any[];
}

@Injectable()
export class MultipleAutocompleteStore extends ComponentStore<MultipleAutocompleteState> {
  public readonly value$ = this.select((state) => state.value);

  constructor() {
    super({
      value: [],
    });
  }

  addMultiple(values: any[]): void {
    this.setState((state) => {
      return {
        ...state,
        value: _.uniq([...state.value, ...values]),
      };
    });
  }

  setValue(values: any[]): void {
    this.setState((state) => {
      return {
        ...state,
        value: _.uniq([...values]),
      };
    });
  }

  add(value: any) {
    this.setState((state) => {
      return {
        ...state,
        value: _.uniq([...state.value, value]),
      };
    });
  }

  remove(value: any) {
    this.setState((state) => {
      return {
        ...state,
        value: _.uniq([...state.value.filter((f) => f != value)]),
      };
    });
  }

  removeAll() {
    this.setState((state) => {
      return {
        ...state,
        value: [],
      };
    });
  }
}
