import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { BackendService } from '../backend.service';
import { ShapeService } from '../shape.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  private map: any;
  private counties: any;
  private geojson: any;

  constructor(private shapeService: ShapeService,
              private backend: BackendService) {}

  ngAfterViewInit(): void {
    this.geojson =  L.geoJSON(this.counties);
    this.initMap();

    this.shapeService.getStateShapes().subscribe(counties => {
      this.counties = counties;
      this.initCountiesLayer();
    });

  }

  private highlightFeature(layer: any) {
    layer.setStyle({
      weight: 5,
      color: '#665',
      dashArray: '',
      fillOpacity: 0.7
    });
  }

  private resetHighlight(layer: any) {
    this.geojson.resetStyle(layer);
  }

  private onEachFeature(feature: any, layer: any) {
    let self = this;

    // Highlight features on mouseover
    layer.on('mouseover', async function() {
      self.highlightFeature(layer);
      let data = await self.backend.getCountyData(feature['properties']['name']);
      console.log(data)
    });

    layer.on('mouseout', function() {
      self.resetHighlight(layer);
    });
  }
  
  private loadTiles() {

  }

  private getColor(val: number) {
    return val > 1000 ? '#800026' :
           val > 500  ? '#BD0026' :
           val > 200  ? '#E31A1C' :
           val > 100  ? '#FC4E2A' :
           val > 50   ? '#FD8D3C' :
           val > 20   ? '#FEB24C' :
           val > 10   ? '#FED976' :
                        '#FFEDA0';
  } 

  private style(feature: any) {
    return {
      weight: 3,
      opacity: 0.5,
      color: '#008f68',
      fillOpacity: 0.8,
      fillColor: '#6DB65B',
    };
}

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 37.4316, -79.5 ],
      zoom: 7.25
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 10,
      minZoom: 7.25,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    }).addTo(this.map);

    this.map.whenReady(this.loadTiles);
  }

  private initCountiesLayer() {
    this.geojson = L.geoJSON(this.counties, {
      style: this.style,
      onEachFeature: (feature, layer ) => {
        this.onEachFeature(feature, layer);
      }
    });

    this.geojson.addTo(this.map)
  }
}
