import { Component, OnInit } from '@angular/core';
import { NlogService } from '../nlog.service';
import { NlogViewModel } from './nlog-view-model';
import { NlogModel } from './nlog-model';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-nlog',
  templateUrl: './nlog.component.html',
  styleUrls: ['./nlog.component.css']
})
export class NlogComponent implements OnInit {
  nlogViewModel: NlogViewModel;
  activeNlog: NlogModel;
  shortDatetimeFormat: string = environment.shortDatetimeFormat;
  longDatetimeFormat: string = environment.longDatetimeFormat;
  page: number = 1;
  numberOfItemsPerPage: number = environment.numberOfItemsPerPage;
  maximumNumberOfPagesToDisplay: number = environment.maximumNumberOfPagesToDisplay;
  messageColumnMaxLength: number = 150;
  datepickerFormat: string = environment.datepickerFormat;
  inferiorCreateDate: Date;
  superiorCreateDate: Date;
  processName: string = '';
  isLoading: Boolean = false;

  constructor(private nlogService: NlogService) { }

  ngOnInit() {
    this.getNlogViewModel();
  }

  getNlogViewModel(): void {
    this.setIsLoading(true);
    this.nlogService.getNlogViewModel(this.inferiorCreateDate, this.superiorCreateDate, this.processName)
      .subscribe(nlogViewModel => this.nlogViewModel = nlogViewModel)
      .add(() => this.setIsLoading(false));
  }

  setActiveNlog(nlog: NlogModel): void {
    this.activeNlog = nlog;
  }

  isError(logLevel: string): boolean {
    return logLevel == "Error";
  }

  isWarning(logLevel: string): boolean {
    return logLevel == "Warning";
  }

  isInfo(logLevel: string): boolean {
    return logLevel == "Info";
  }

  getResultsCountLabel(): string {
    let resultsCount: number = 0;
    let resultsLabel: string;

    if (this.nlogViewModel && this.nlogViewModel.nlogs && this.nlogViewModel.nlogs.length) {
      resultsCount = this.nlogViewModel.nlogs.length;
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
