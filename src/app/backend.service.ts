import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private backend_url = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) { }

  public getCountyData(name: string): Promise<any> {
    return this.http.get(`${this.backend_url}/${name.toLowerCase().replace(" ", "_")}`).toPromise();
  }
}
