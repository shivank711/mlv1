import { Injectable } from '@angular/core';
import {
  HttpClient, HttpEvent, HttpEventType, HttpProgressEvent,
  HttpRequest, HttpResponse, HttpErrorResponse, HttpHeaders
} from '@angular/common/http';
import {Response} from '@angular/http';

import { of } from 'rxjs';
import { catchError, last, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { PapaParseService } from 'ngx-papaparse';

@Injectable()
export class UploaderService {
  data: any = {};
  constructor(
    private http: HttpClient,
    private messenger: MessageService,
    private papa: PapaParseService
    ) {
        // const csvData = '"Hello","World!"';
        // debugger;
        // const options = {
        //     complete: (results, file) => {
        //         console.log('Parsed: ', results, file);
        //     }
        //     // Add your options here
        // };

        // this.papa.parse(csvData,options);
  }

  // If uploading multiple files, change to:
  // upload(files: FileList) {
  //   const formData = new FormData();
  //   files.forEach(f => formData.append(f.name, f));
  //   new HttpRequest('POST', '/upload/file', formData, {reportProgress: true});
  //   ...
  // }

  upload(file: File) {

    if (!file) { return; }
    const vm = this;
    console.log(file)
    // COULD HAVE WRITTEN:
    // return this.http.post('/upload/file', file, {
    //   reportProgress: true,
    //   observe: 'events'
    // }).pipe(

    // Create the request object that POSTs the file to an upload endpoint.
    // The `reportProgress` option tells HttpClient to listen and return
    // XHR progress events.
     const formData = new FormData();

    // add the files
    // if (file && file.length) {
      formData.append('file',file);
    // }

    // add the data object
    // formData.append('data', new Blob([JSON.stringify(data)], {type: 'application/json'}));
    console.log(formData);
    
    const url = "http://localhost:8080/user/fileUpload";
    console.log("after urll post");
    // const req = new HttpRequest('POST', url, formData, {
    //   reportProgress: true,

    // });
    console.log("in the upload service");
    // The `HttpClient.request` API produces a raw event stream
    // which includes start (sent), progress, and response events.
   
    const httpOptions = {
      reportProgress: true,
      responseType: 'text' as 'text'
    };
      // return this.http.request(req).subscribe(value => {
      //     console.log("this is what i get from subscribe")
      //     console.log(value);
      //     this.data = value;
      //   });
      
      // return this.http.post(url, formData, httpOptions).subscribe(data  =>{
      //   this.data = data;
       
      //   console.log(this.data);
      //   console.log("vm.papa..........---->>>>>")
      //   console.log(vm.papa)
      //   console.log("going in the debuggerrr------>>>>>>")
      //   const value = data;
      //          debugger;

        
        //console.log(data);
//        const options = {
//            complete: (results, file) => {
//                console.log('Parsed: ', results, file);
//           }
            // Add your options here
//        };
//        console.log("papa.parse--->>>")
//        this.papa.parse(value,options);
//        console.log(value);
//        debugger;
          // papa.parse(data,{
          //     complete: (results, file) => {
          //         console.log('Parsed: ', results, file);
          //     }
          // });
        // if (data.type == 2) {
        //   console.log(data.body);
        // }
//      }); 
         return this.http.post(url, formData, httpOptions).subscribe(data => {
           console.log(data);
           const options ={
             complete: (results, file)=>{
               console.log('Paresed', results, file)
             }
           };
           console.log(this.papa.parse(data,options))
           console.log("parsed data is as follows---")
           console.log(data)
           debugger;
         })   
        
  }
}



