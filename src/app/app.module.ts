import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShapeService } from './services/shape.service';
import { MapComponent } from './map/map.component';
import { UploadPanelComponent } from './upload-panel/upload-panel.component';
import { FormsModule } from '@angular/forms';
import { LegendComponent } from './legend/legend.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    UploadPanelComponent,
    LegendComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ShapeService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
