import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { LogEntry } from './log.services';

export abstract class LogPublisher {
  location: string;

  abstract log(record: LogEntry): Observable<boolean>;
  abstract clear(): Observable<boolean>;
}

export class LogConsole extends LogPublisher {
  log(record: LogEntry): Observable<boolean> {
    console.log(record.buildLogString());

    return Observable.of(true);
  }

  clear(): Observable<boolean> {
    console.clear();

    return Observable.of(true);
  }
}

export class LogLocalStorage extends LogPublisher {
  constructor() {
    super();
    this.location = 'logging';
  }

  log(record: LogEntry): Observable<boolean> {
    const ret = false;
    let values: LogEntry[];

    try {
      values = JSON.parse(localStorage.getItem(this.location)) || [];
      // add entry
      values.push(record);
      // store the complete array to local storage
      localStorage.setItem(this.location, JSON.stringify(values));
    } catch (ex) {
      console.log(ex);
    }
    return Observable.of(ret);
  }

  clear(): Observable<boolean> {
    localStorage.removeItem(this.location);
    return Observable.of(true);
  }

  getAll(): Observable<LogEntry[]> {
      let values: LogEntry[];

      // Retrieve all values from local storage
      values = JSON.parse(localStorage.getItem(this.location)) || [];

      return Observable.of(values);
  }
}
