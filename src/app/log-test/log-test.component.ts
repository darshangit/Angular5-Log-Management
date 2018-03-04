import { Component, OnInit } from '@angular/core';
import { LogService, LogLevel } from '../shared/log.services';

@Component({
  selector: 'app-log-test',
  templateUrl: 'log-test.component.html'
})
export class LogTestComponent implements OnInit {
  constructor(private logger: LogService) {}

  ngOnInit() {}

  testLog(): void {
    // this.logger.level = LogLevel.Off;

    this.logger.debug('test log method', 'paul', 'john', 2, 3);
  }
}
