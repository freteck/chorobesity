import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { ShapeService } from '../shape.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  private map: any;
  private counties: any;

  constructor(private shapeService: ShapeService) {}

  ngAfterViewInit(): void {
    this.initMap();

    this.shapeService.getStateShapes().subscribe(counties => {
      this.counties = counties;
      this.initCountiesLayer();
    });

  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 37.4316, -79.5 ],
      zoom: 7.25
    });

    const tiles = L.tileLayer('https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=np9Ag3zMN1eqg19uZeYA#3.2/44.38317/-78.08289', {
      maxZoom: 10,
      minZoom: 7.25,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
    
    const self = this;
    this.map.on("load",function() { setTimeout(() => {
      self.map.invalidateSize();
    }, 1); });
  }

  private initCountiesLayer() {
    const stateLayer = L.geoJSON(this.counties, {
      style: (feature) => ({
        weight: 3,
        opacity: 0.5,
        color: '#008f68',
        fillOpacity: 0.8,
        fillColor: '#6DB65B'
      })
    });

    this.map.addLayer(stateLayer);
  }

  onMapReady(map: any) {
    setTimeout(() => {
      map.invalidateSize();
    }, 0);
}
}
