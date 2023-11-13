import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor() { }

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
            color = "#e6e2e2";
      } else if (
        child.obesity_percentage_afflicted >= mean_obesity - scale*std_obesity && 
        child.obesity_percentage_afflicted < mean_obesity + scale*std_obesity) {
          color = "#d6a1a2";
      } else if (
        child.obesity_percentage_afflicted >= mean_obesity + scale*std_obesity) {
          color = "#c65b5d";
      } 
    } else if (view === "diabetes") {
      if (
        child.obesity_percentage_afflicted < mean_obesity - scale*std_obesity) {
            color = "#e6e2e2";
      } else if (
        child.obesity_percentage_afflicted >= mean_obesity - scale*std_obesity && 
        child.obesity_percentage_afflicted < mean_obesity + scale*std_obesity) {
          color = "#a0b3d3";
      } else if (
        child.obesity_percentage_afflicted >= mean_obesity + scale*std_obesity) {
          color = "#5c85c5";
      } 
    } else {
      if (
        child.obesity_percentage_afflicted < mean_obesity - scale*std_obesity && 
        child.diabetes_percentage_afflicted < mean_diabetes - scale*std_diabetes) {
            color = "#e6e2e2";
      } else if (
        child.obesity_percentage_afflicted >= mean_obesity - scale*std_obesity && 
        child.obesity_percentage_afflicted < mean_obesity + scale*std_obesity &&
        child.diabetes_percentage_afflicted < mean_diabetes - scale*std_diabetes) {
          color = "#d6a1a2";
      } else if (
        child.obesity_percentage_afflicted >= mean_obesity + scale*std_obesity && 
        child.diabetes_percentage_afflicted < mean_diabetes - scale*std_diabetes) {
          color = "#c65b5d";
      } 
      
      else if (
        child.obesity_percentage_afflicted < mean_obesity - scale*std_obesity && 
        child.diabetes_percentage_afflicted >= mean_diabetes - scale*std_diabetes && 
        child.diabetes_percentage_afflicted < mean_diabetes + scale*std_diabetes) {
          color = "#a0b3d3";    
      } else if (
        child.obesity_percentage_afflicted >= mean_obesity - scale*std_obesity && 
        child.obesity_percentage_afflicted < mean_obesity + scale*std_obesity &&
        child.diabetes_percentage_afflicted >= mean_diabetes - scale*std_diabetes && 
        child.diabetes_percentage_afflicted < mean_diabetes + scale*std_diabetes) {
          color = "#967f97";    
      } else if (
        child.obesity_percentage_afflicted >= mean_obesity + scale*std_obesity && 
        child.diabetes_percentage_afflicted >= mean_diabetes - scale*std_diabetes && 
        child.diabetes_percentage_afflicted < mean_diabetes + scale*std_diabetes) {
          color = "#8b4857";    
      }
  
      else if (
        child.obesity_percentage_afflicted < mean_obesity - scale*std_obesity && 
        child.diabetes_percentage_afflicted >= mean_diabetes + scale*std_diabetes) {
          color = "#5c85c5";    
      } else if (
        child.obesity_percentage_afflicted >= mean_obesity - scale*std_obesity && 
        child.obesity_percentage_afflicted < mean_obesity + scale*std_obesity &&
        child.diabetes_percentage_afflicted >= mean_diabetes + scale*std_diabetes) {
          color = "#967f97";    
      } else if (
        child.obesity_percentage_afflicted >= mean_obesity + scale*std_obesity && 
        child.diabetes_percentage_afflicted >= mean_diabetes + scale*std_diabetes) {
          color = "#967f97";    
      }
    }

    return color;
    
  }
}
