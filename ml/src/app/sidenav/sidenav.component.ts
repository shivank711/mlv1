import { Component, OnInit } from '@angular/core';
import {DatasourceComponent} from '../datasource/datasource.component';
import {UploaderService} from './uploader.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  providers : [UploaderService]

})
export class SidenavComponent implements OnInit {


  message: string;
	
  constructor(private uploaderService: UploaderService) { }

  ngOnInit() {
  }

  onPicked(input: HTMLInputElement) {
  	console.log("-----<<<< in to the pick function ");
    const file = input.files[0];
    const data = '';
    if (file) {
      this.uploaderService.upload(file).subscribe(
      	data => { data = data},
      	
      	 // msg => {
        //   input.value = null;
        //   //this.message = msg;
        // }
      )
    }
      	console.log("-----<<<< out of the the pick function ");

  }

}
