import {NgModule} from '@angular/core';
import {ColumnChooser} from './column-chooser';
import {
  MatButtonModule, MatCheckboxModule, MatIconModule, MatListModule,
  MatTooltipModule
} from '@angular/material';
import {CommonModule} from '@angular/common';
import {PrettifyColumnPipe} from './prettify-column.pipe';

@NgModule({
  declarations: [ColumnChooser, PrettifyColumnPipe],
  exports: [ColumnChooser],
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
})
export class ColumnChooserModule { }
