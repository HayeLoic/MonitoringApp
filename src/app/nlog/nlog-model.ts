export class NlogModel {
    id: number;
    createDate: Date;
    machineName: string;
    processId: number;
    processName: string;
    version: string;
    logLevel: string;
    message: string;
    exception: string;
    stackTrace: string;
  }