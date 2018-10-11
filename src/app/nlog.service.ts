// Commented code = code to use WebApi
import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { NlogViewModel } from './nlog/nlog-view-model';
import { NlogModel } from './nlog/nlog-model';
// import { environment } from '../environments/environment';
// import { DataConverterService } from './data-converter.service';

// const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }) };
const nlogModelToGenerateCount: number = 265;

@Injectable({
  providedIn: 'root'
})

export class NlogService {
  // private getNlogViewModelUrl = environment.apiEndpoint + '/Nlog/GetLastNlogModels';

  private nlogModels: NlogModel[];

  // private distinctProcessNames: string[] = ['WebService602','Batch250'];
  private distinctProcessNames: string[];

  generateNlogModels(nlogModelToGenerateCount: number): NlogModel[] {
    let generatedNlogModels: NlogModel[] = [];
    let createDate: Date = new Date(2018, 0, 1);
    let batchVersion: number = 1;
    let webServiceVersion: number = 1;
    for (let counter = 1; counter <= nlogModelToGenerateCount; counter++) {

      let randomNumberOne = Math.round(Math.random() * 10); // entre 0 et 10
      let randomNumberTwo = Math.round(Math.random() * 5); // entre 0 et 5
      let randomNumberThree = Math.round(Math.random() * 100); // entre 0 et 100
      let processId = Math.round(Math.random() * 10000); // entre 0 et 10000
      let secondsToAdd = Math.round(Math.random() * 50000);

      let logLevel: string;
      if (randomNumberOne == 0) {
        logLevel = 'Error';
      }
      if (randomNumberOne == 1) {
        logLevel = 'Warning';
      }
      if (randomNumberOne > 1) {
        logLevel = 'Info';
      }

      let machineName: string = randomNumberTwo == 1 ? 'server 5604' : 'server 1274';
      let processName: string = randomNumberTwo == 1 ? 'Batch' : 'WebService';
      createDate = new Date(createDate.getTime() + secondsToAdd * 3000);

      if (randomNumberThree < 1) {
        batchVersion++;
      }
      if (randomNumberThree > 98) {
        webServiceVersion++;
      }

      let nlogModel: NlogModel = {
        id: counter,
        createDate: createDate,
        machineName: machineName,
        processId: processId,
        processName: processName,
        version: 'v' + (processName == 'Batch' ? batchVersion : webServiceVersion) + '.0',
        logLevel: logLevel,
        message: 'message ' + counter,
        exception: logLevel == 'Error' ? 'exception description ' + counter : '',
        stackTrace: logLevel == 'Error' ? 'stackTrace ' + counter : ''
      };
      generatedNlogModels.unshift(nlogModel);
    }
    return generatedNlogModels;
  }

  getDistinctProcessNames(): string[] {
    let distinctProcessNames: string[] = [];
    for (let nlogModel of this.nlogModels) {
      if (!distinctProcessNames.includes(nlogModel.processName)) {
        distinctProcessNames.push(nlogModel.processName);
      }
    }
    return distinctProcessNames;
  }

  constructor() {
    this.nlogModels = this.generateNlogModels(nlogModelToGenerateCount);
    this.distinctProcessNames = this.getDistinctProcessNames()
  }
  // constructor(private http: HttpClient, private dataConverterService: DataConverterService) { }

  getNlogViewModel(inferiorCreateDate: Date, superiorCreateDate: Date, processName: string): Observable<NlogViewModel> {
    let filteredNlogModels = this.nlogModels;
    if (inferiorCreateDate) {
      filteredNlogModels = filteredNlogModels.filter(nlogModel => nlogModel.createDate >= inferiorCreateDate);
    }
    if (superiorCreateDate) {
      filteredNlogModels = filteredNlogModels.filter(nlogModel => nlogModel.createDate <= superiorCreateDate);
    }
    if (processName) {
      filteredNlogModels = filteredNlogModels.filter(nlogModel => nlogModel.processName == processName);
    }
    let nlogViewModel: NlogViewModel =
      { errorMessage: '', nlogs: filteredNlogModels, processNames: this.distinctProcessNames };

    return of(nlogViewModel as NlogViewModel);
    // let getLastNlogModelsParameter = 'inferiorCreateDate=' + this.dataConverterService.ConvertDateToString(inferiorCreateDate);
    // getLastNlogModelsParameter += '&superiorCreateDate=' + this.dataConverterService.ConvertDateToString(superiorCreateDate);
    // getLastNlogModelsParameter += '&processName=' + processName;
    // return this.http.post<NlogViewModel>(this.getNlogViewModelUrl, getLastNlogModelsParameter, httpOptions);
  }
}