import { Injectable } from '@angular/core';
import {
  LogPublisher,
  LogConsole,
  LogLocalStorage,
  LogPublisherConfig
} from './log-publishers';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const PUBLISHER_FILE = 'assets/log-publishers.json';

@Injectable()
export class LogPublisherService {
  constructor(private http: HttpClient) {
    this.buildPublishers();
  }

  publishers: LogPublisher[] = [];

  buildPublishers(): void {
    // this.publishers.push(new LogConsole());
    // this.publishers.push(new LogLocalStorage());

    let logPub: LogPublisher;

    this.getLoggers().subscribe(response => {
      for (const pub of response.filter(p => p.isActive)) {
        switch (pub.loggerName.toLowerCase()) {
          case 'console':
            logPub = new LogConsole();
            break;

          case 'localstorage':
            logPub = new LogLocalStorage();
            break;
        }

        // Set Location, if any , of the logging
        logPub.location = pub.loggerLocation;
        this.publishers.push(logPub);
      }
    });
  }

  getLoggers(): Observable<LogPublisherConfig[]> {
    return this.http
      .get<LogPublisherConfig[]>(PUBLISHER_FILE)
      .catch(this.handleErrors);
  }

  private handleErrors(error: any) {
    const errors: String[] = [];
    let msg = '';

    msg = 'Status: ' + error.status;
    msg += ' - Status Text: ' + error.statusText;

    if (error.json()) {
      msg += ' - Exception Message: ' + error.json().exceptionMessage;
    }

    errors.push(msg);

    console.log('An Error Occurred', errors);

    return Observable.throw(errors);
  }
}
