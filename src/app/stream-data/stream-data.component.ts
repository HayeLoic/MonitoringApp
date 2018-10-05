import { Component, OnInit } from '@angular/core';
import { StreamDataService } from '../stream-data.service';
import { StreamDataViewModel } from './stream-data-view-model';
import { StreamDataModel } from './stream-data-model';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-stream-data',
  templateUrl: './stream-data.component.html',
  styleUrls: ['./stream-data.component.css']
})
export class StreamDataComponent implements OnInit {
  streamDataViewModel: StreamDataViewModel;
  activeStreamData: StreamDataModel;
  shortDatetimeFormat: string = environment.shortDatetimeFormat;
  longDatetimeFormat: string = environment.longDatetimeFormat;
  page: number = 1;
  numberOfItemsPerPage: number = environment.numberOfItemsPerPage;
  maximumNumberOfPagesToDisplay: number = environment.maximumNumberOfPagesToDisplay;
  datepickerFormat: string = environment.datepickerFormat;
  inferiorInsertDate: Date;
  superiorInsertDate: Date;
  isLoading: Boolean = false;

  constructor(private streamDataService: StreamDataService) { }

  ngOnInit() {
    this.getStreamDataViewModel();
  }

  getStreamDataViewModel(): void {
    this.setIsLoading(true);
    this.streamDataService.getStreamDataViewModel(this.inferiorInsertDate, this.superiorInsertDate)
      .subscribe(streamDataViewModel => this.streamDataViewModel = streamDataViewModel)
      .add(() => this.setIsLoading(false));
  }

  setActiveStreamData(streamData: StreamDataModel): void {
    this.activeStreamData = streamData;
  }

  getResultsCountLabel(): string {
    let resultsCount: number = 0;
    let resultsLabel: string;

    if (this.streamDataViewModel && this.streamDataViewModel.streamDatas && this.streamDataViewModel.streamDatas.length) {
      resultsCount = this.streamDataViewModel.streamDatas.length;
    }

    if (resultsCount < 2) {
      resultsLabel = ' résultat';
    } else {
      resultsLabel = ' résultats';
    }
    return resultsCount + resultsLabel;
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }
}
