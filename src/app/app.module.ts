import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {CdkTableModule} from '@angular/cdk/table';
import {MatPaginatorModule, MatSortModule, MatTableModule} from '@angular/material';

import {AppComponent} from './app.component';
import {OrdersDatabase} from './orders-db';
import {HeaderModule} from './header/header.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HeaderModule,

    // CDK modules
    CdkTableModule,

    // Material modules
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  providers: [OrdersDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
