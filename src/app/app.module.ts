import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {CdkTableModule} from '@angular/cdk/table';
import {MatIconModule, MatPaginatorModule, MatSortModule, MatTableModule} from '@angular/material';

import {AppComponent} from './app.component';
import {OrdersDatabase} from './orders-db';
import {BakeryHeaderModule} from './bakery-header/bakery-header.module';
import {ColumnChooserModule} from './column-chooser/column-chooser.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    BakeryHeaderModule,
    ColumnChooserModule,

    // CDK modules
    CdkTableModule,

    // Material modules
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
  ],
  providers: [OrdersDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
