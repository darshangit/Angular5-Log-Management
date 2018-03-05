import { Injectable } from '@angular/core';
import { LogPublisher, LogConsole } from './log-publishers';

@Injectable()
export class LogPublisherService {

    constructor() {
        this.buildPublishers();
    }

    publishers: LogPublisher[] = [];

    buildPublishers(): void {
        this.publishers.push(new LogConsole());
    }
}
