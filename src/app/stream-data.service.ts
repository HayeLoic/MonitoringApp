// Commented code = code to use WebApi
import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { StreamDataViewModel } from './stream-data/stream-data-view-model';
import { StreamDataModel } from './stream-data/stream-data-model';
// import { environment } from '../environments/environment';
// import { DataConverterService } from './data-converter.service';

// const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }) };
const streamDataModelToGenerateCount: number = 357;

@Injectable({
  providedIn: 'root'
})

export class StreamDataService {
  // private getStreamDataViewModelUrl = environment.apiEndpoint + '/Nlog/GetLastStreamDataModels';

  private streamDataModels: StreamDataModel[];

  generateStreamDataModels(streamDataModelToGenerateCount: number): StreamDataModel[] {
    let generatedStreamDataModels: StreamDataModel[] = [];
    let insertOrExportDate: Date = new Date(2018, 0, 1);
    for (let counter = 1; counter <= streamDataModelToGenerateCount; counter++) {

      //0 ou 1
      let randomNumberOne = Math.round(Math.random());
      let randomNumberTwo = Math.round(Math.random());
      let secondsToAdd = Math.round(Math.random() * 300000);

      let isValid = (randomNumberOne == 1);
      let areDataExported = (isValid && randomNumberTwo == 1);
      insertOrExportDate = new Date(insertOrExportDate.getTime() + secondsToAdd * 1000);

      let streamDataModel: StreamDataModel = {
        id: counter,
        streamProjectId: 1,
        rawData: 'rawData' + counter,
        exportData: 'exportData' + counter,
        areDataExported: areDataExported,
        isStreamValid: isValid,
        contentMessage: isValid ? '' : 'error ' + counter,
        clientDatabaseName: 'clientDatabaseName',
        exportDate: isValid ? insertOrExportDate : null,
        insertDate: insertOrExportDate
      };
      generatedStreamDataModels.unshift(streamDataModel);
    }
    return generatedStreamDataModels;
  }

  constructor() {
    this.streamDataModels = this.generateStreamDataModels(streamDataModelToGenerateCount);
  }
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