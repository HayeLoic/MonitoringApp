// Commented code = code to use WebApi
import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { StreamDataViewModel } from './stream-data/stream-data-view-model';
import { StreamDataModel } from './stream-data/stream-data-model';
// import { environment } from '../environments/environment';
// import { DataConverterService } from './data-converter.service';

// const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }) };

@Injectable({
  providedIn: 'root'
})

export class StreamDataService {
  // private getStreamDataViewModelUrl = environment.apiEndpoint + '/Nlog/GetLastStreamDataModels';

  private streamDataModels: StreamDataModel[] = [
    { id: 1, streamProjectId: 1, rawData: 'rawData1', exportData: 'exportData1', areDataExported: true, isStreamValid: true, contentMessage: '', clientDatabaseName: 'clientDatabaseName', exportDate: new Date(2018, 2, 5, 5, 30), insertDate: new Date(2018, 2, 5, 4, 2) },
    { id: 2, streamProjectId: 1, rawData: 'rawData2', exportData: '', areDataExported: false, isStreamValid: true, contentMessage: '', clientDatabaseName: 'clientDatabaseName', exportDate: null, insertDate: new Date(2018, 1, 14, 15, 7) },
    { id: 3, streamProjectId: 1, rawData: 'rawData3', exportData: '', areDataExported: false, isStreamValid: false, contentMessage: 'data not valid', clientDatabaseName: 'clientDatabaseName', exportDate: null, insertDate: new Date(2018, 1, 1, 10, 55) }
  ];

  constructor() { }
  // constructor(private http: HttpClient, private dataConverterService: DataConverterService) { }

  getStreamDataViewModel(inferiorInsertDate: Date, superiorInsertDate: Date): Observable<StreamDataViewModel> {
    let filteredStreamDataModels = this.streamDataModels;
    if (inferiorInsertDate) {
      filteredStreamDataModels = filteredStreamDataModels.filter(streamDataModel => streamDataModel.insertDate >= inferiorInsertDate);
    }
    if (superiorInsertDate) {
      filteredStreamDataModels = filteredStreamDataModels.filter(streamDataModel => streamDataModel.insertDate <= superiorInsertDate);
    }
    let streamDataViewModel: StreamDataViewModel =
      { errorMessage: '', streamDatas: filteredStreamDataModels };

    return of(streamDataViewModel as StreamDataViewModel);
    // let getLastStreamDataModelsParameter = 'inferiorInsertDate=' + this.dataConverterService.ConvertDateToString(inferiorInsertDate);
    // getLastStreamDataModelsParameter += '&superiorInsertDate=' + this.dataConverterService.ConvertDateToString(superiorInsertDate);
    // return this.http.post<StreamDataViewModel>(this.getStreamDataViewModelUrl, getLastStreamDataModelsParameter, httpOptions);
  }
} 