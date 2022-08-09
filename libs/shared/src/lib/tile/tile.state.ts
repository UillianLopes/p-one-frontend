import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Color } from '../@types';

export interface TileState {
    isLoading: boolean;
    color: Color;
}

@Injectable()
export class TileStore extends ComponentStore<TileState> {

    public readonly color$ = this.select(({ color }) => color);
    public readonly isLoading$ = this.select(({ isLoading }) => isLoading);

    constructor() {
        super();
    }

    public readonly setColor = this.updater((state, color: Color) => ({ ...state, color }));

    public readonly setIsLoading = this.updater((state, isLoading: boolean) => ({ ...state, isLoading }));

}