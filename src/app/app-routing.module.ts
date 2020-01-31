import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { DataTableComponent } from './data-table/data-table.component';
import { ItemComponent } from './item/item.component';
import { ItemFormComponent } from './item-form/item-form.component';


const routes: Routes = [
  {path: '', component: SiteLayoutComponent, children:[
    {path: '', component:DataTableComponent},
    {path: ':id/edit', component:ItemFormComponent},
    {path: 'new', component:ItemFormComponent},
    {path: ':id', component:ItemComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
