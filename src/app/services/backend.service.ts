import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private backend_url = `${environment.backendUrl}/api/states`;

  constructor(private http: HttpClient) { }

  public getChildData(view: string): Promise<any> {
    if (view === "national") 
      return this.http.get(`${this.backend_url}/`).toPromise();
    else
      return this.http.get(`${this.backend_url}/${view}/`).toPromise();
  }
  
  public async getData(view: string): Promise<any> {
    let ret = "";
    (<any[]> await this.http.get(`${this.backend_url}/`).toPromise()).forEach((el: any) => {
        if (el.name === view)
          ret = el;
    });
    return ret;
  }

  public getStateDataByCounty(name: string): Promise<any[]> {
    return <Promise<any[]>> this.http.get(`${this.backend_url}/`).toPromise();
  }

  public uploadFile(filename: string, filedata: any): Promise<void> {
    return <Promise<void>> this.http.post(`${this.backend_url}/upload/test.xlsx`, {'file': filedata}).toPromise();
  }
}
