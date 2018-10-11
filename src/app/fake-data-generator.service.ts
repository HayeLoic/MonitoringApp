import { Injectable } from '@angular/core';
import { NlogModel } from './nlog/nlog-model';
import { StreamDataModel } from './stream-data/stream-data-model';

@Injectable({
  providedIn: 'root'
})
export class FakeDataGeneratorService {

  constructor() { }

  generateStreamDataModels(streamDataModelToGenerateCount: number): StreamDataModel[] {
    let generatedStreamDataModels: StreamDataModel[] = [];
    let insertOrExportDate: Date = new Date(2018, 0, 1);
    for (let generatedDataCounter = 1; generatedDataCounter <= streamDataModelToGenerateCount; generatedDataCounter++) {
      let randomNumberIsValid = this.generateRandomRoundedNumber(1);
      let randomNumberAreDataExported = this.generateRandomRoundedNumber(1);
      let secondsToAdd = this.generateRandomRoundedNumber(300000);
      let isValid = (randomNumberIsValid == 1);
      let areDataExported = (isValid && randomNumberAreDataExported == 1);
      insertOrExportDate = new Date(insertOrExportDate.getTime() + secondsToAdd * 1000);

      let streamDataModel: StreamDataModel = {
        id: generatedDataCounter,
        streamProjectId: 1,
        rawData: 'rawData' + generatedDataCounter,
        exportData: areDataExported ? 'exportData' + generatedDataCounter : '',
        areDataExported: areDataExported,
        isStreamValid: isValid,
        contentMessage: isValid ? 'success' : 'error description ' + generatedDataCounter,
        clientDatabaseName: 'clientDatabaseName',
        exportDate: areDataExported ? insertOrExportDate : null,
        insertDate: insertOrExportDate
      };
      generatedStreamDataModels.unshift(streamDataModel);
    }
    return generatedStreamDataModels;
  }

  generateNlogModels(nlogModelToGenerateCount: number): NlogModel[] {
    let generatedNlogModels: NlogModel[] = [];
    let createDate: Date = new Date(2018, 0, 1);
    let batchVersion: number = 1;
    let webServiceVersion: number = 1;
    for (let generatedDataCounter = 1; generatedDataCounter <= nlogModelToGenerateCount; generatedDataCounter++) {
      let randomNumberMachineAndProcessName = this.generateRandomRoundedNumber(5);
      let randomNumberVersion = this.generateRandomRoundedNumber(100);
      let processId = this.generateRandomRoundedNumber(10000);
      let secondsToAdd = this.generateRandomRoundedNumber(50000);
      let logLevel: string = this.generateLogLevel(this.generateRandomRoundedNumber(10));
      let machineName: string = randomNumberMachineAndProcessName == 1 ? 'server 5604' : 'server 1274';
      let processName: string = randomNumberMachineAndProcessName == 1 ? 'Batch' : 'WebService';
      createDate = new Date(createDate.getTime() + secondsToAdd * 3000);

      if (randomNumberVersion < 1) {
        batchVersion++;
      }
      if (randomNumberVersion > 98) {
        webServiceVersion++;
      }

      let nlogModel: NlogModel = {
        id: generatedDataCounter,
        createDate: createDate,
        machineName: machineName,
        processId: processId,
        processName: processName,
        version: 'v' + (processName == 'Batch' ? batchVersion : webServiceVersion) + '.0',
        logLevel: logLevel,
        message: 'message ' + generatedDataCounter,
        exception: logLevel == 'Error' ? 'exception description ' + generatedDataCounter : '',
        stackTrace: logLevel == 'Error' ? 'stackTrace ' + generatedDataCounter : ''
      };
      generatedNlogModels.unshift(nlogModel);
    }
    return generatedNlogModels;
  }

  generateRandomRoundedNumber(maxValue: number): number {
    return Math.round(Math.random() * maxValue);
  }

  generateLogLevel(randomNumber: number): string {
    if (randomNumber == 0) {
      return 'Error';
    }
    if (randomNumber == 1) {
      return 'Warning';
    }
    if (randomNumber > 1) {
      return 'Info';
    }
  }
}
