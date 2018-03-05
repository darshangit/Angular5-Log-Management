import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LogTestComponent } from './log-test/log-test.component';
import { LogService } from './shared/log.services';
import { LogPublisherService } from './shared/log-publishers.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent, LogTestComponent
  ],
  imports: [
    BrowserModule, HttpClientModule
  ],
  providers: [LogService, LogPublisherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
