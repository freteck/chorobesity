import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShapeService } from './shape.service';
import { MapComponent } from './map/map.component';
import { UploadPanelComponent } from './upload-panel/upload-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    UploadPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    ShapeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
