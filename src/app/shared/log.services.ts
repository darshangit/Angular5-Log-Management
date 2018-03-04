import { Injectable } from '@angular/core';

export enum LogLevel {
  All = 0,
  Debug = 1,
  Info = 2,
  Warn = 3,
  Error = 4,
  Fatal = 5,
  Off = 6
}

@Injectable()
export class LogService {
  level: LogLevel = LogLevel.All;
  logWithDate = true;

  private shouldLog(level: LogLevel): boolean {
    let ret = false;

    if (this.level !== LogLevel.Off && level >= this.level) {
      ret = true;
    }
    return ret;
  }

  debug(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Debug, optionalParams);
  }

  info(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Info, optionalParams);
  }

  warning(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Warn, optionalParams);
  }

  error(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Error, optionalParams);
  }

  fatal(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Fatal, optionalParams);
  }

  private formatParams(params: any[]): string {
    let ret: string = params.join(',');

    if (params.some(p => typeof p === 'object')) {
      ret = '';
      for (const item of params) {
        ret += JSON.stringify(item) + ',';
      }
    }
    return ret;
  }

  private writeToLog(msg: string, level: LogLevel, params?: any[]) {
    if (this.shouldLog(level)) {
      let value = '';

      // Build Log String
      if (this.logWithDate) {
        value = new Date() + '-';
      }

      value += 'Type: ' + LogLevel[level];
      value += ' - Message: ' + JSON.stringify(msg);
      value += ' - Extra Info: ' + this.formatParams(params);

      // Log the value
      console.log(value);
    }
  }

  log(msg: any, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.All, optionalParams);
  }
}
