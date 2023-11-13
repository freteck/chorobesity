import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private view: string = "";

  constructor() { }

  public setView(view: string) {
    this.view = view;
  }

  public getView() {
    return this.view;
  }
}
