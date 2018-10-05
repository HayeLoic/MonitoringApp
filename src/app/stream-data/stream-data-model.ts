export class StreamDataModel {
    id: number;
    streamProjectId: number;
    rawData: string;
    exportData: string;
    areDataExported: boolean;
    isStreamValid: boolean;
    contentMessage: string;
    clientDatabaseName: string;
    exportDate: Date;
    insertDate: Date;
  }