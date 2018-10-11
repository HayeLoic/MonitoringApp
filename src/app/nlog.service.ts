// Commented code = code to use WebApi
import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { NlogViewModel } from './nlog/nlog-view-model';
import { NlogModel } from './nlog/nlog-model';
import { FakeDataGeneratorService } from './fake-data-generator.service';
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
  private distinctProcessNames: string[];

  getDistinctProcessNames(): string[] {
    let distinctProcessNames: string[] = [];
    for (let nlogModel of this.nlogModels) {
      if (!distinctProcessNames.includes(nlogModel.processName)) {
        distinctProcessNames.push(nlogModel.processName);
      }
    }
    return distinctProcessNames;
  }

  constructor(private fakeDataGeneratorService: FakeDataGeneratorService) {
    this.nlogModels = this.fakeDataGeneratorService.generateNlogModels(nlogModelToGenerateCount);
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