// Commented code = code to use WebApi
import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { StreamDataViewModel } from './stream-data/stream-data-view-model';
import { StreamDataModel } from './stream-data/stream-data-model';
import { FakeDataGeneratorService } from './fake-data-generator.service';
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

  constructor(private fakeDataGeneratorService: FakeDataGeneratorService) {
    this.streamDataModels = this.fakeDataGeneratorService.generateStreamDataModels(streamDataModelToGenerateCount);
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