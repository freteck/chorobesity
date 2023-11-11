import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  private file: any;

  constructor(private backend: BackendService) { }

  ngOnInit(): void {
  }

  protected addFile(event: any) {
    if (event) {
      let files = event.target.files;
      if (files.length > 0) {
        this.file = files[0];
      }
    }
  }

  protected async upload() {
    if (this.file) {
      await this.backend.uploadFile("", this.file);
    }
  }
}
