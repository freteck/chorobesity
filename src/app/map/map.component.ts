import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { BackendService } from '../services/backend.service';
import { ShapeService } from '../shape.service';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  private map: any;
  private counties: any;
  private geojson: any;
  protected activeFeature: any = null;
  protected isFeatureActive = false;
  private stateBoundaries: any;
  protected featureData: Map<string, any> = new Map();

  constructor(private shapeService: ShapeService,
    private backend: BackendService,
    protected utils: UtilsService) { }

  async ngAfterViewInit(): Promise<void> {
    this.geojson = L.geoJSON(this.counties);
    this.initMap();
    this.shapeService.getStateBoundaries().subscribe(states => {
      this.stateBoundaries = states;
      this.initStateBoundariesLayer();
    });
    this.shapeService.getCountiesShapes().subscribe(counties => {
      this.counties = counties;
      this.initCountiesLayer();
    });

    // CHANGE THIS
    (await this.backend.getStateDataByCounty("VA")).forEach((feature: any) => {
      this.featureData.set(feature.name, feature);
    });
  }
  private initStateBoundariesLayer(): void {
    L.geoJSON(this.stateBoundaries, {
      style: {
        color: "#000000",
        weight: 4,
        opacity: 1
      }
    }).addTo(this.map);
  }

  private async activateFeature(feature: any, layer: any): Promise<void> {
    this.isFeatureActive = true;
    layer.setStyle({
      fillOpacity: 1
    });
    let mod_name = feature['properties']['name'].toLowerCase().replace(" ", "_");
    if (this.featureData.has(mod_name))
      this.activeFeature = this.featureData.get(mod_name);
    else
      this.isFeatureActive = false;
  }

  private async deactivateFeature(feature: any, layer: any): Promise<void> {
    this.geojson.resetStyle(layer);
    this.activeFeature = null;
    this.isFeatureActive = false;
  }

  private onEachFeature(feature: any, layer: any) {
    let self = this;

    // Highlight features on mouseover
    layer.on('mouseover', async function () {
      self.activateFeature(feature, layer);
    });

    layer.on('mouseout', function () {
      self.deactivateFeature(feature, layer);
    });
  }

  private style(feature: any) {
    return {
      weight: 2,
      opacity: 0.5,
      color: '#008f68',
      fillOpacity: 0.8,
      fillColor: '#6DB65B',
    };
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [39.8283, -98.5795],
      zoom: 5
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 10,
      minZoom: 1,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    }).addTo(this.map);

  }

  private initCountiesLayer() {
    this.geojson = L.geoJSON(this.counties, {
      style: this.style,
      onEachFeature: (feature, layer) => {
        this.onEachFeature(feature, layer);
      }
    });

    this.geojson.addTo(this.map)
  }
}
