import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LegendComponent } from './legend/legend.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
  { path: "", component: MapComponent},
  { path: "legend", component: LegendComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
