import { Component, OnInit } from '@angular/core';
import { UploadService } from './../../../services/upload.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  selectedFiles: FileList;
  progressInfos = [];
  message = '';
  data;

  fileInfos: Observable<any>;

  constructor(private uploadService: UploadService) { }

  ngOnInit(): void {
    // this.fileInfos = this.uploadService.getFiles();
  }

  selectFiles(event): void {
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }

  uploadFiles(): void {
    this.message = '';
    this.upload(this.selectedFiles);
  }

  upload(file): void {

    this.uploadService.upload(file).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {

        } else if (event instanceof HttpResponse) {
          this.data = event.body;
          console.log(this.data)
          let source = JSON.stringify(event.body);
        }

      },
      err => {
        this.message = 'Could not upload the file:' + file.name;
      });
  }

}
