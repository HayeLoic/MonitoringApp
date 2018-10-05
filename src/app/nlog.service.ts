// Commented code = code to use WebApi
import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { NlogViewModel } from './nlog/nlog-view-model';
import { NlogModel } from './nlog/nlog-model';
// import { environment } from '../environments/environment';
// import { DataConverterService } from './data-converter.service';

// const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }) };

@Injectable({
  providedIn: 'root'
})

export class NlogService {
  // private getNlogViewModelUrl = environment.apiEndpoint + '/Nlog/GetLastNlogModels';

  private nlogModels: NlogModel[] = [
    { id: 1, createDate: new Date(2018, 2, 15, 14, 26), machineName: 'server806', processId: 15610, processName: 'WebService602', version: 'v1.0.1', logLevel: 'Info', message: 'info message', exception: '', stackTrace: '' },
    { id: 2, createDate: new Date(2018, 3, 8, 3, 7), machineName: 'server806', processId: 20489, processName: 'WebService602', version: 'v1.0.1', logLevel: 'Warning', message: 'warning message', exception: '', stackTrace: '' },
    { id: 3, createDate: new Date(2018, 6, 1, 17, 3), machineName: 'server806', processId: 32746, processName: 'WebService602', version: 'v1.0.1', logLevel: 'Error', message: 'error message', exception: 'exception', stackTrace: 'stackTrace' },
    { id: 4, createDate: new Date(2018, 6, 6, 8, 50), machineName: 'server475', processId: 32746, processName: 'Batch250', version: 'v1.0.0', logLevel: 'Error', message: 'error message 2', exception: 'exception 2', stackTrace: 'stackTrace 2' }
  ];

  // private distinctProcessNames: string[] = ['WebService602','Batch250'];
  private distinctProcessNames: string[] = this.getDistinctProcessNames();

  getDistinctProcessNames(): string[] {
    let distinctProcessNames: string[] = [];
    for (let nlogModel of this.nlogModels) {
      if (!distinctProcessNames.includes(nlogModel.processName)) {
        distinctProcessNames.push(nlogModel.processName);
      }
    }
    return distinctProcessNames;
  }

  constructor() { }
  // constructor(private http: HttpClient, private dataConverterService: DataConverterService) { }

  getNlogViewModel(inferiorCreateDate: Date, superiorCreateDate: Date, processName: string): Observable<NlogViewModel> {
    let filteredNlogModels = this.nlogModels;
    if (inferiorCreateDate) {
      filteredNlogModels = filteredNlogModels.filter(streamDataModel => streamDataModel.createDate >= inferiorCreateDate);
    }
    if (superiorCreateDate) {
      filteredNlogModels = filteredNlogModels.filter(streamDataModel => streamDataModel.createDate <= superiorCreateDate);
    }
    if (processName) {
      filteredNlogModels = filteredNlogModels.filter(streamDataModel => streamDataModel.processName == processName);
    }
    let nlogViewModel: NlogViewModel =
      { errorMessage: '', nlogs: filteredNlogModels, processNames: this.distinctProcessNames };

    return of(nlogViewModel as NlogViewModel);
    // let getLastStreamDataModelsParameter = 'inferiorCreateDate=' + this.dataConverterService.ConvertDateToString(inferiorCreateDate);
    // getLastStreamDataModelsParameter += '&superiorCreateDate=' + this.dataConverterService.ConvertDateToString(superiorCreateDate);
    // getLastStreamDataModelsParameter += '&processName=' + processName;
    // return this.http.post<NlogViewModel>(this.getNlogViewModelUrl, getLastStreamDataModelsParameter, httpOptions);
  }
}