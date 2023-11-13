import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { BackendService } from '../services/backend.service';
import { ColorService } from '../services/color.service';
import { ShapeService } from '../services/shape.service';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  private map: any;
  private geojson: any;
  protected activeFeature: any = null;
  protected isFeatureActive = false;
  protected featureData: Map<string, any> = new Map();
  protected cursorInSettings: boolean = false;
  protected settingsOpen: boolean = false;
  protected focus: any = "virginia";
  protected activeRegions: any[] = [];
  protected data: any[] = [];
  protected parentData: any;
  protected view: string = "bivariate";

  constructor(private shapeService: ShapeService,
    private backend: BackendService,
    protected utils: UtilsService,
    private colorService: ColorService) { }
  
  protected states: string[] = this.utils.getStates();

  private updateMapView() {
    this.activeRegions = [];
    if (this.geojson)
      this.geojson.clearLayers();
    if (this.focus === "national") {
      this.shapeService.getStateBoundaries().subscribe((counties: any) => {
        counties.features.forEach((feature: any) => {
          if (this.utils.isInState(feature, this.focus)) {
            this.activeRegions.push(feature);
          }
        });
        this.initCountiesLayer();
      });
    } else {
      this.shapeService.getCountiesShapes().subscribe((counties: any) => {
        counties.features.forEach((feature: any) => {
          if (this.utils.isInState(feature, this.focus)) {
            this.activeRegions.push(feature);
          }
        });
        this.initCountiesLayer();
      });
    }
  
  }

  async ngAfterViewInit(): Promise<void> {
    this.parentData = await this.backend.getData(this.focus);
    this.data = await this.backend.getChildData(this.focus);
    this.data.forEach((el: any) => {
      this.featureData.set(el.county, el);
    })
    this.initMap();
    this.updateMapView();
  }


  private async activateFeature(feature: any, layer: any): Promise<void> {
    this.isFeatureActive = true;
    layer.setStyle({
      color: "#000",
      weight: 3
    });
    layer.bringToFront()
    let cleaned_name;
    if (this.focus === "national") {
      cleaned_name = this.utils.clean(feature['properties']['name']);
    } else {
      cleaned_name = this.utils.clean(feature['properties']['NAME']);
    }

    if (this.featureData.has(cleaned_name))
      this.activeFeature = this.featureData.get(cleaned_name);
    else if (this.featureData.has(cleaned_name + "_city")) {
      this.activeFeature = this.featureData.get(cleaned_name + "_city");
    } else
      this.isFeatureActive = false;
  }

  private resetStyle(feature: any, layer: any) {
    let f: any;
    if (this.focus === "national") 
      f = this.featureData.get(this.utils.clean(feature.properties.name));
    else
      f = this.featureData.get(this.utils.clean(feature.properties.NAME));
    
    // Handle cities
    if (f === undefined) { 
      f = this.featureData.get(this.utils.clean(feature.properties.NAME + "_city"));
    }
    if (f === undefined) {
      console.log(this.utils.clean(feature.properties.NAME));
    }
    layer.setStyle({
      weight: 1,
      opacity: 0.5,
      color: "#fff",
      fillOpacity: 1,
      fillColor: this.colorService.getColor(f, this.parentData, this.view)
    })
  }

  private async deactivateFeature(feature: any, layer: any): Promise<void> {
    this.resetStyle(feature, layer);
    this.activeFeature = null;
    this.isFeatureActive = false;
  }
  

  private onEachFeature(feature: any, layer: any) {
    this.resetStyle(feature, layer);
    let self = this;

    // Highlight features on mouseover
    layer.on('mouseover', async function () {
      self.activateFeature(feature, layer);
    });

    layer.on('mouseout', function () {
      self.deactivateFeature(feature, layer);
    });
  }


  private initMap(): void {
    this.map = L.map('map', {
      center: [37.8283, -80.5795],
      zoom: 7.25
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 10,
      minZoom: 1,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    }).addTo(this.map);

  }

  private initCountiesLayer() {
    this.geojson = L.geoJSON(this.activeRegions, {
      onEachFeature: (feature, layer) => {
        this.onEachFeature(feature, layer);
      }
    });

    this.geojson.addTo(this.map)
  }

  protected enterSettingsRegion() {
    this.cursorInSettings = true;
  }
  
  protected exitSettingsRegion() {
    this.cursorInSettings = false;
  }

  protected openSettings() {
    this.settingsOpen = true;
  }

  protected closeSettings() {
    this.settingsOpen = false;
  }

  protected async updateFocus() {
    this.data = await this.backend.getChildData(this.focus);
    this.parentData = await this.backend.getData(this.focus);
    this.featureData.clear();
    if (this.focus === "national")
      this.data.forEach((el: any) => {
        this.featureData.set(el.name, el);
      });
    else
      this.data.forEach((el: any) => {
        this.featureData.set(el.county, el);
      })
    this.updateMapView();
    let coords;
    let zoom: number;
    if (this.focus !== "national") {
      coords = this.utils.getStateCoordinates(this.focus);
      zoom = 7.25
    } else {
      coords = {"latitude": 39.8283, "longitude": -98.5795};
      zoom = 5;
    }
    this.map.flyTo([coords.latitude, coords.longitude], zoom);
  }

  protected updateView() {
    this.updateMapView();
  }
}
