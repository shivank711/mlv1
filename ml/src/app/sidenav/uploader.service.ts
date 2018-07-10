import { Injectable } from '@angular/core';
import {
  HttpClient, HttpEvent, HttpEventType, HttpProgressEvent,
  HttpRequest, HttpResponse, HttpErrorResponse, HttpHeaders
} from '@angular/common/http';
import {Response} from '@angular/http';

import { of } from 'rxjs';
import { catchError, last, map, tap } from 'rxjs/operators';
import { PapaParseService } from 'ngx-papaparse';

@Injectable()
export class UploaderService {
  data: any = {};
  csvData: any[] = [];
  constructor(
    private http: HttpClient,
    private papa: PapaParseService
    ) {
        
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return errMsg;
  }


  private extractData(data){

    let csvData = data;
    console.log("in the extract function ")
    
    let allTextLines = csvData.split(/\r\n|\n/);
    let headers = allTextLines[0].split(',');
    //console.log(headers);
    let lines = [];

    for ( let i = 0; i < allTextLines.length; i++) {
        // split content based on comma
        let data = allTextLines[i].split(',');
        if (data.length == headers.length) {
            let tarr = [];
            for ( let j = 0; j < headers.length; j++) {
                tarr.push(data[j]);
               
            }
            lines.push(tarr);
            
            //console.log(tarr);
        }
    }
    this.csvData = lines;
    //console.log("csvdata");
    console.log(this.csvData);
    

  }
  
  upload(file: File) {
// csv file should not contain spaces in header names;
    if (!file) { return; }
    const vm = this;
    console.log(file)
    
     const formData = new FormData();

    
      formData.append('file',file);
    
    console.log(formData);
    
    const url = "http://localhost:8080/user/fileUpload";
    console.log("after urll post");
    
    console.log("in the upload service");
    
    const httpOptions = {
      reportProgress: true,
      responseType: 'text' as 'text'
    };
       
         return this.http.post(url, formData, httpOptions).subscribe(data => {
          // console.log(data);
           const options ={
             complete: (results, file)=>{
               console.log('Paresed', results, file)
             }
           };
           this.papa.parse(data,options)
           //console.log("parsed data is as follows---")
           //console.log(data)
           console.log("extracting data from csv--------->>>");
           this.extractData(data);
           err => this.handleError(err);       
          
         })   
        
  }
}



