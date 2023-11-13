import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  

  constructor() { }
  private mean_obesity: number = -1;
  private mean_diabetes: number = -1;
  private std_obesity: number = -1;
  private std_diabetes: number = -1;
  private widthFactor: number = 1;

  private colors: string[][] = 
  [
    ["#e6e2e2", "#a0b3d3", "#5c85c5"],
    ["#d6a1a2", "#967f97", "#565f8d"],
    ["#c65b5d", "#8b4857", "#503651"],
  ]

  public getColor(child: any, parent: any, view: string): string {
    this.mean_obesity = Number(parent.mean_obesity_percentage);
    this.mean_diabetes = Number(parent.mean_diabetes_percentage);
    this.std_obesity = Number(parent.std_obesity_percentage);
    this.std_diabetes = Number(parent.std_diabetes_percentage);


    let color: string = "#000";

    if (view === "obesity") {
      if (
        child.obesity_percentage_afflicted < this.mean_obesity - this.widthFactor*this.std_obesity) {
            color = this.colors[0][0];
      } else if (
        child.obesity_percentage_afflicted >= this.mean_obesity - this.widthFactor*this.std_obesity && 
        child.obesity_percentage_afflicted < this.mean_obesity + this.widthFactor*this.std_obesity) {
          color = this.colors[1][0];
      } else if (
        child.obesity_percentage_afflicted >= this.mean_obesity + this.widthFactor*this.std_obesity) {
          color = this.colors[2][0];
      } 
    } else if (view === "diabetes") {
      if (
        child.diabetes_percentage_afflicted < this.mean_diabetes - this.widthFactor*this.std_diabetes) {
            color = this.colors[0][0]
      } else if (
        child.diabetes_percentage_afflicted >= this.mean_diabetes - this.widthFactor*this.std_diabetes && 
        child.diabetes_percentage_afflicted < this.mean_diabetes + this.widthFactor*this.std_diabetes) {
          color = this.colors[0][1];
      } else if (
        child.diabetes_percentage_afflicted >= this.mean_diabetes + this.widthFactor*this.std_diabetes) {
          color = this.colors[0][2];
      } 
    } else {
      if (
        child.obesity_percentage_afflicted < this.mean_obesity - this.widthFactor*this.std_obesity && 
        child.diabetes_percentage_afflicted < this.mean_diabetes - this.widthFactor*this.std_diabetes) {
            color = this.colors[0][0];
      } else if (
        child.obesity_percentage_afflicted >= this.mean_obesity - this.widthFactor*this.std_obesity && 
        child.obesity_percentage_afflicted < this.mean_obesity + this.widthFactor*this.std_obesity &&
        child.diabetes_percentage_afflicted < this.mean_diabetes - this.widthFactor*this.std_diabetes) {
          color = this.colors[1][0];
      } else if (
        child.obesity_percentage_afflicted >= this.mean_obesity + this.widthFactor*this.std_obesity && 
        child.diabetes_percentage_afflicted < this.mean_diabetes - this.widthFactor*this.std_diabetes) {
          color = this.colors[2][0];
      } 
      
      else if (
        child.obesity_percentage_afflicted < this.mean_obesity - this.widthFactor*this.std_obesity && 
        child.diabetes_percentage_afflicted >= this.mean_diabetes - this.widthFactor*this.std_diabetes && 
        child.diabetes_percentage_afflicted < this.mean_diabetes + this.widthFactor*this.std_diabetes) {
          color = this.colors[0][1];    
      } else if (
        child.obesity_percentage_afflicted >= this.mean_obesity - this.widthFactor*this.std_obesity && 
        child.obesity_percentage_afflicted < this.mean_obesity + this.widthFactor*this.std_obesity &&
        child.diabetes_percentage_afflicted >= this.mean_diabetes - this.widthFactor*this.std_diabetes && 
        child.diabetes_percentage_afflicted < this.mean_diabetes + this.widthFactor*this.std_diabetes) {
          color = this.colors[1][1];
      } else if (
        child.obesity_percentage_afflicted >= this.mean_obesity + this.widthFactor*this.std_obesity && 
        child.diabetes_percentage_afflicted >= this.mean_diabetes - this.widthFactor*this.std_diabetes && 
        child.diabetes_percentage_afflicted < this.mean_diabetes + this.widthFactor*this.std_diabetes) {
          color = this.colors[2][1]; 
      }
  
      else if (
        child.obesity_percentage_afflicted < this.mean_obesity - this.widthFactor*this.std_obesity && 
        child.diabetes_percentage_afflicted >= this.mean_diabetes + this.widthFactor*this.std_diabetes) {
          color = this.colors[0][2];    
      } else if (
        child.obesity_percentage_afflicted >= this.mean_obesity - this.widthFactor*this.std_obesity && 
        child.obesity_percentage_afflicted < this.mean_obesity + this.widthFactor*this.std_obesity &&
        child.diabetes_percentage_afflicted >= this.mean_diabetes + this.widthFactor*this.std_diabetes) {
          color = this.colors[1][2];    
      } else if (
        child.obesity_percentage_afflicted >= this.mean_obesity + this.widthFactor*this.std_obesity && 
        child.diabetes_percentage_afflicted >= this.mean_diabetes + this.widthFactor*this.std_diabetes) {
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

  public getRange(col: number, row: number, view: string) {
    let ret: any = [[], []]

    if (view !== "diabetes") {
      if (row == 2) {
        ret[0] = [0, this.mean_obesity - this.widthFactor*this.std_obesity];
      } else if (row == 1) {
        ret[0] = [this.mean_obesity - this.widthFactor*this.std_obesity, this.mean_obesity + this.widthFactor*this.std_obesity];
      } else if (row == 0) {
        ret[0] = [this.mean_obesity + this.widthFactor*this.std_obesity, 100];
      }
    }

    if (view !== "obesity") {
      if (col == 0) {
        ret[1] = [0, this.mean_diabetes - this.widthFactor*this.std_diabetes];
      } else if (col == 1) {
        ret[1] = [this.mean_diabetes - this.widthFactor*this.std_diabetes, this.mean_diabetes + this.widthFactor*this.std_diabetes];
      } else if (col == 2) {
        ret[1] = [this.mean_diabetes + this.widthFactor*this.std_diabetes, 100];
      }
    }

    let f_ret: any[][] = [];
    let temp: any;
    ret.forEach((y: any) => {
      temp = [];
      y.forEach((el: any) => {
        temp.push(`${Math.round(el * 100) / 100}%`);
      });
      f_ret.push(temp);
    });

    return f_ret;
  }

  public getWidthFactor() {
    return this.widthFactor;
  }

  public setWidthFactor(wf: number) {
    this.widthFactor = wf;
  }
}
