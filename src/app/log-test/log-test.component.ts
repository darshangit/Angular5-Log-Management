import { Component, OnInit } from '@angular/core';
import { LogService } from '../shared/log.services';

@Component({
  selector: 'app-log-test',
  templateUrl: 'log-test.component.html'
})
export class LogTestComponent implements OnInit {
  constructor(private logger: LogService) {}

  ngOnInit() {}

  testLog(): void {
    this.logger.log('test log method');
  }
}