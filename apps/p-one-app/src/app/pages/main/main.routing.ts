import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full',
            },
            {
                path: 'financial',
                loadChildren: () => import('./pages/financial/financial.module').then((e) => e.FinancialModule),
            },
            {
                path: 'admin',
                loadChildren: () => import('./pages/admin/admin.module').then((e) => e.AdminModule),
            },
            {
                path: 'home',
                loadChildren: () => import('./pages/home/home.module').then((e) => e.HomeModule),
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }