import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BreadcrumbItemComponent } from './breadcrumb-item/breadcrumb-item.component';
import { BreadcrumbComponent } from './breadcrumb.component';

@NgModule({
  declarations: [BreadcrumbComponent, BreadcrumbItemComponent],
  imports: [CommonModule, RouterModule],
  exports: [BreadcrumbComponent, BreadcrumbItemComponent],
})
export class POneBreadcrumbModule {}
