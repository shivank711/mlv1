import { Component, OnInit } from '@angular/core';
import {DatasourceComponent} from '../datasource/datasource.component';
import {UploaderService} from './uploader.service';
import {Input} from '@angular/core';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  providers : [UploaderService]

})


export class SidenavComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  message: string;
      
  constructor(private uploaderService: UploaderService) { }

  ngOnInit() {
  }

  onPicked(input: HTMLInputElement) {
    console.log("-----<<<< in to the pick function ");
    const file = input.files[0];
    const data = '';
    if (file) {
      this.uploaderService.upload(file);    
    }
        //console.log("-----<<<< out of the the pick function and printing csv data");
        //this.display(csvData);
      
  }
    getdata(){
      console.log("calling getdata---->>>>>>>>> this.uploaderservice.parseData");
      console.log(this.uploaderService.parseData.data[0]);
      return this.uploaderService.parseData.data[0]  
     
  }
  display(){
    const displayedColumns=  this.uploaderService.parseData.meta.fields
  const dataSource = this.uploaderService.parseData.data

    console.log("in the display function for table");
    console.log(displayedColumns)
    console.log(dataSource)

  }
}
