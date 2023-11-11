import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShapeService {
  constructor(private http: HttpClient) { }

  getCountiesShapes() {
    return this.http.get('./../assets/geojson/counties.geojson');
  }
  getStateBoundaries() {
    return this.http.get('./../assets/geojson/us-states.json');
  }
}
