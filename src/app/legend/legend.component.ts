import { Component, OnInit } from '@angular/core';
import { ColorService } from '../services/color.service';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss']
})
export class LegendComponent implements OnInit {

  constructor(protected utils: UtilsService,
              protected colorService: ColorService) { }

  ngOnInit(): void {
  }

  protected closeWindow() {
    window.close();
  }
}
