import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor() { }

  private colors: string[][] = 
  [
    ["#e6e2e2", "#a0b3d3", "#5c85c5"],
    ["#d6a1a2", "#967f97", "#565f8d"],
    ["#c65b5d", "#8b4857", "#503651"],
  ]

  public getColor(child: any, parent: any, view: string): string {
    const mean_obesity: number = Number(parent.mean_obesity_percentage);
    const mean_diabetes: number = Number(parent.mean_diabetes_percentage);
    const std_obesity: number = Number(parent.std_obesity_percentage);
    const std_diabetes: number = Number(parent.std_diabetes_percentage);


    let color: string = "#000";
    const scale: number = .3;

    if (view === "obesity") {
      if (
        child.obesity_percentage_afflicted < mean_obesity - scale*std_obesity) {
            color = this.colors[0][0];
      } else if (
        child.obesity_percentage_afflicted >= mean_obesity - scale*std_obesity && 
        child.obesity_percentage_afflicted < mean_obesity + scale*std_obesity) {
          color = this.colors[1][0];
      } else if (
        child.obesity_percentage_afflicted >= mean_obesity + scale*std_obesity) {
          color = this.colors[2][0];
      } 
    } else if (view === "diabetes") {
      if (
        child.diabetesy_percentage_afflicted < mean_diabetes - scale*std_diabetes) {
            color = this.colors[0][0]
      } else if (
        child.diabetes_percentage_afflicted >= mean_diabetes - scale*std_diabetes && 
        child.diabetes_percentage_afflicted < mean_diabetes + scale*std_diabetes) {
          color = this.colors[0][1];
      } else if (
        child.diabetes_percentage_afflicted >= mean_diabetes + scale*std_diabetes) {
          color = this.colors[0][2];
      } 
    } else {
      if (
        child.obesity_percentage_afflicted < mean_obesity - scale*std_obesity && 
        child.diabetes_percentage_afflicted < mean_diabetes - scale*std_diabetes) {
            color = this.colors[0][0];
      } else if (
        child.obesity_percentage_afflicted >= mean_obesity - scale*std_obesity && 
        child.obesity_percentage_afflicted < mean_obesity + scale*std_obesity &&
        child.diabetes_percentage_afflicted < mean_diabetes - scale*std_diabetes) {
          color = this.colors[1][0];
      } else if (
        child.obesity_percentage_afflicted >= mean_obesity + scale*std_obesity && 
        child.diabetes_percentage_afflicted < mean_diabetes - scale*std_diabetes) {
          color = this.colors[2][0];
      } 
      
      else if (
        child.obesity_percentage_afflicted < mean_obesity - scale*std_obesity && 
        child.diabetes_percentage_afflicted >= mean_diabetes - scale*std_diabetes && 
        child.diabetes_percentage_afflicted < mean_diabetes + scale*std_diabetes) {
          color = this.colors[0][1];    
      } else if (
        child.obesity_percentage_afflicted >= mean_obesity - scale*std_obesity && 
        child.obesity_percentage_afflicted < mean_obesity + scale*std_obesity &&
        child.diabetes_percentage_afflicted >= mean_diabetes - scale*std_diabetes && 
        child.diabetes_percentage_afflicted < mean_diabetes + scale*std_diabetes) {
          color = this.colors[1][1];
      } else if (
        child.obesity_percentage_afflicted >= mean_obesity + scale*std_obesity && 
        child.diabetes_percentage_afflicted >= mean_diabetes - scale*std_diabetes && 
        child.diabetes_percentage_afflicted < mean_diabetes + scale*std_diabetes) {
          color = this.colors[2][1]; 
      }
  
      else if (
        child.obesity_percentage_afflicted < mean_obesity - scale*std_obesity && 
        child.diabetes_percentage_afflicted >= mean_diabetes + scale*std_diabetes) {
          color = this.colors[0][2];    
      } else if (
        child.obesity_percentage_afflicted >= mean_obesity - scale*std_obesity && 
        child.obesity_percentage_afflicted < mean_obesity + scale*std_obesity &&
        child.diabetes_percentage_afflicted >= mean_diabetes + scale*std_diabetes) {
          color = this.colors[1][2];    
      } else if (
        child.obesity_percentage_afflicted >= mean_obesity + scale*std_obesity && 
        child.diabetes_percentage_afflicted >= mean_diabetes + scale*std_diabetes) {
          color = this.colors[2][2];    
      }
    }

    return color;
    
  }

  public getColorFromCoords(y: number, x: number) {
    if (y >= 0 && y <= 2 && x >= 0 && x <= 2)
      return this.colors[2-y][x];
    return "";
  }
}
