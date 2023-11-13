import { Component, OnInit } from '@angular/core';
import { ColorService } from '../services/color.service';
import { MapService } from '../services/map.service';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss']
})
export class LegendComponent implements OnInit {
  protected selectedOColorRange: string = "test";
  protected selectedDColorRange: string = "test";
  protected colorRangeActive: boolean = false;
  protected selectedColorCoords: number[] = [];
  protected view: string = "";

  constructor(protected utils: UtilsService,
              protected colorService: ColorService,
              private mapService: MapService) { }

  ngOnInit(): void {
    this.view = this.mapService.getView();
  }

  protected closeWindow() {
    window.close();
  }

  protected activateColorRange(col: number, row: number) {
    this.colorRangeActive = true;
    let ranges = this.colorService.getRange(col, row, this.view);
    this.selectedOColorRange = ranges[0];
    this.selectedDColorRange = ranges[1];
    this.selectedColorCoords = [col, row];
  }

  public setView(view: string) {
    this.view = this.mapService.getView();
  }
}
