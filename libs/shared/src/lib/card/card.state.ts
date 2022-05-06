import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

export interface CardState {
  isLoading: boolean;
  image?: string;
}

@Injectable()
export class CardStore extends ComponentStore<CardState> {
  public readonly isLoading$ = this.select(({ isLoading }) => isLoading);
  public readonly image$ = this.select(({ image }) => image);

  constructor() {
    super({
      isLoading: false,
    });
  }

  public readonly setIsLoading = this.updater((state, isLoading: boolean) => ({
    ...state,
    isLoading,
  }));

  public readonly setImage = this.updater((state, image: string) => ({
    ...state,
    image,
  }));
}
