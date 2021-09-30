import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridDirective } from './grid.directive';
import { GridColumnDirective } from './grid-column.directive';
import { GridRowDirective } from './grid-row.directive';



@NgModule({
  declarations: [
    GridDirective,
    GridColumnDirective,
    GridRowDirective
  ],
  imports: [
    CommonModule
  ]
})
export class GridModule { }
