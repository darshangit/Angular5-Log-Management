import { Component, OnInit } from '@angular/core';
import { LogService, LogLevel, LogEntry } from '../shared/log.services';
import { Product } from './product';
import { LogLocalStorage } from '../shared/log-publishers';

@Component({
  selector: 'app-log-test',
  templateUrl: 'log-test.component.html'
})
export class LogTestComponent {
  constructor(private logger: LogService) {}

  logEntries: LogEntry[];

  testLog(): void {
    // this.logger.level = LogLevel.Off;
    this.logger.debug('test log method', 'paul', 'john', 2, 3);
  }

  clearLog(): void {
    this.logger.clear();
  }

  objectLog(): void {
    const product = new Product();
    product.productId = 1;
    product.productName = 'A new Product';
    product.introductionDate = new Date();
    product.price = 10;
    product.url = 'www.asdas.com';

    this.logger.log('this is a product value', product);
  }

  getLocalStorage(): void {
    // to single out the publisher I want
    const tmp = this.logger.publishers.find(
      p => p.constructor.name === 'LogLocalStorage'
    );

    if (tmp != null) {
      const local = tmp as LogLocalStorage;
      local.getAll().subscribe(response => (this.logEntries = response));
    }
  }
}
