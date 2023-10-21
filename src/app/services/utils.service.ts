import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  public uppercaseSentence(s: string) {
    const words = s.split(" ");
    let ret = "";
    words.forEach((word: string) => {
      ret += `${word[0].toUpperCase()}${word.substring(1)} `;
    })
    return ret;
  }
}
