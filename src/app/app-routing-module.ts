import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiExplorer } from './api-explorer/api-explorer';

const routes: Routes = [
   { path: '', component: ApiExplorer }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
