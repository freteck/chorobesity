import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShapeService {
  constructor(private http: HttpClient) { }

  getStateShapes() {
    return this.http.get('./../assets/geojson/virginia-with-counties.geojson');
  }
}