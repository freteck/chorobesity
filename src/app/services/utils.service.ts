import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private stateFIPCodes: any = {
    "alabama": "01",
    "alaska": "02",
    "arizona": "04",
    "arkansas": "05",
    "california": "06",
    "colorado": "08",
    "connecticut": "09",
    "delaware": "10",
    "florida": "12",
    "georgia": "13",
    "hawaii": "15",
    "idaho": "16",
    "illinois": "17",
    "indiana": "18",
    "iowa": "19",
    "kansas": "20",
    "kentucky": "21",
    "louisiana": "22",
    "maine": "23",
    "maryland": "24",
    "massachusetts": "25",
    "michigan": "26",
    "minnesota": "27",
    "mississippi": "28",
    "missouri": "29",
    "montana": "30",
    "nebraska": "31",
    "nevada": "32",
    "new_hampshire": "33",
    "new_jersey": "34",
    "new_mexico": "35",
    "new_york": "36",
    "north_carolina": "37",
    "north_dakota": "38",
    "ohio": "39",
    "oklahoma": "40",
    "oregon": "41",
    "pennsylvania": "42",
    "rhode_island": "44",
    "south_carolina": "45",
    "south_dakota": "46",
    "tennessee": "47",
    "texas": "48",
    "utah": "49",
    "vermont": "50",
    "virginia": "51",
    "washington": "53",
    "west_virginia": "54",
    "wisconsin": "55",
    "wyoming": "56"
  }
  
  private stateCoordinates: any = {
    alabama: { latitude: 32.806671, longitude: -86.791130 },
    alaska: { latitude: 61.016025, longitude: -149.105170 },
    arizona: { latitude: 33.729759, longitude: -111.431221 },
    arkansas: { latitude: 34.969704, longitude: -92.373123 },
    california: { latitude: 36.778259, longitude: -119.417931 },
    colorado: { latitude: 39.550051, longitude: -105.782067 },
    connecticut: { latitude: 41.603221, longitude: -73.087749 },
    delaware: { latitude: 38.910832, longitude: -75.527670 },
    florida: { latitude: 27.994402, longitude: -81.760254 },
    georgia: { latitude: 33.040619, longitude: -83.643074 },
    hawaii: { latitude: 21.307442, longitude: -157.857376 },
    idaho: { latitude: 44.240459, longitude: -114.478828 },
    illinois: { latitude: 40.349457, longitude: -88.986137 },
    indiana: { latitude: 39.849426, longitude: -86.258278 },
    iowa: { latitude: 42.011539, longitude: -93.210526 },
    kansas: { latitude: 38.526600, longitude: -96.726486 },
    kentucky: { latitude: 37.668140, longitude: -84.670067 },
    louisiana: { latitude: 31.169546, longitude: -91.867805 },
    maine: { latitude: 45.369545, longitude: -69.242859 },
    maryland: { latitude: 39.063946, longitude: -76.802101 },
    massachusetts: { latitude: 42.230171, longitude: -71.530106 },
    michigan: { latitude: 43.326618, longitude: -84.536095 },
    minnesota: { latitude: 45.694454, longitude: -93.900192 },
    mississippi: { latitude: 32.741646, longitude: -89.678696 },
    missouri: { latitude: 38.456085, longitude: -92.288368 },
    montana: { latitude: 46.921925, longitude: -110.454353 },
    nebraska: { latitude: 41.125370, longitude: -98.268082 },
    nevada: { latitude: 38.313515, longitude: -117.055374 },
    new_hampshire: { latitude: 43.452492, longitude: -71.563896 },
    new_jersey: { latitude: 40.298904, longitude: -74.521011 },
    new_mexico: { latitude: 34.840515, longitude: -106.248482 },
    new_york: { latitude: 42.165726, longitude: -74.948051 },
    north_carolina: { latitude: 35.630066, longitude: -79.806419 },
    north_dakota: { latitude: 47.528912, longitude: -99.784012 },
    ohio: { latitude: 40.388783, longitude: -82.764915 },
    oklahoma: { latitude: 35.565342, longitude: -96.928917 },
    oregon: { latitude: 44.572021, longitude: -122.070938 },
    pennsylvania: { latitude: 40.590752, longitude: -77.209755 },
    rhode_island: { latitude: 41.680893, longitude: -71.511780 },
    south_carolina: { latitude: 33.856892, longitude: -80.945007 },
    south_dakota: { latitude: 44.299782, longitude: -99.438828 },
    tennessee: { latitude: 35.747845, longitude: -86.692345 },
    texas: { latitude: 31.054487, longitude: -97.563461 },
    utah: { latitude: 40.150032, longitude: -111.862434 },
    vermont: { latitude: 44.045876, longitude: -72.710686 },
    virginia: { latitude: 37.769337, longitude: -78.169968 },
    washington: { latitude: 47.400902, longitude: -121.490494 },
    west_virginia: { latitude: 38.491226, longitude: -80.954109 },
    wisconsin: { latitude: 44.268543, longitude: -89.616508 },
    wyoming: { latitude: 42.755966, longitude: -107.302490 }
  };
  
  constructor() { }

  public uppercaseSentence(s: string) {
    const words = s.split(" ");
    let ret = "";
    words.forEach((word: string) => {
      ret += `${word[0].toUpperCase()}${word.substring(1)} `;
    })
    return ret;
  }

  public getStates(): string[] {
    return [
      'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
      'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
      'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
      'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
      'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri',
      'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
      'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
      'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
      'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
      'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
    ];
  }

  public getStateCoordinates(state: string): {"latitude": number, "longitude": number} {
    return this.stateCoordinates[this.clean(state)];
  }

  public clean(s: string): string {
    let s_f = this.replaceAll(s, " ", "_")
    s_f = this.replaceAll(s_f, "ñ", "n");
    s_f = this.replaceAll(s_f, "'", "");
    return s_f.toLowerCase();
  }

  public isInState(feature: any, state: string): boolean {
    return feature.properties.STATEFP === this.stateFIPCodes[state]
  }

  public replaceAll(s: string, pattern: string, replacement: string) {
    let s_f = s;
    while (s_f.indexOf(pattern) != -1)
      s_f = s_f.replace(pattern, replacement)
    return s_f;
  }

  public round(num: number) {
    return Math.round(num);
  }
}
