import { Component, OnInit, ViewChild } from '@angular/core';
import {DatasourceComponent} from '../datasource/datasource.component';
import {UploaderService} from './uploader.service';
import {Input} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

export interface PeriodicElement {
  shivank : string;  
  sanki : string;
  pranav : string;

}
// const ELEMENT_DATA  = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];

  var col : any = {};
 const DATA : any[] = [];

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  providers : [UploaderService]
})

export class SidenavComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = this.uploaderService.displayedColumn;
  
  dataSource  = new MatTableDataSource(this.uploaderService.dataSource);

  constructor(private uploaderService: UploaderService) {
     
   }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  onPicked(input: HTMLInputElement) {
    console.log("-----<<<< in to the pick function ");
    const file = input.files[0];
    const data = '';
    if (file) {
      this.uploaderService.upload(file);    
    }

  }
    getdata(){
      console.log("calling getdata---->>>>>>>>> this.uploaderservice.parseData");
      console.log(this.uploaderService.parseData.data[0]);
      return this.uploaderService.parseData.data[0]  
     
  }
  display(){
    console.log(this.displayedColumns)
    console.log(this.dataSource)
    return this.uploaderService.displayedColumn
    
  }
}
