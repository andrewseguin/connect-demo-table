import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'column-chooser',
  templateUrl: './column-chooser.html',
  styleUrls: ['./column-chooser.scss'],
})
export class ColumnChooser implements OnInit {
  @Input()
  get columns(): string[] { return this._columns; }
  set columns(columns: string[]) { this._columns = columns.slice(); }
  _columns: string[];

  /** Enabled set of columns. */
  enabled = new Set();

  /** Ordered set of columns to display. */
  selectedColumns: string[];

  columnTrackBy = (index: number, column: string) => column;

  ngOnInit() {
    const savedColumns = localStorage.getItem('columns');
    if (savedColumns) {
      const colArray = savedColumns.split(',');
      colArray.forEach(col => this.columns.includes(col) ? this.enabled.add(col) : null);
    } else {
      this.columns.slice(0, 3).forEach(col => this.enabled.add(col));
    }

    this.calculateSelectedColumns();
  }

  toggleColumn(column: string, checked: boolean) {
    this.enabled.has(column) ? this.enabled.delete(column) : this.enabled.add(column);
    this.calculateSelectedColumns();
  }

  move(column: string, dir: 'up' | 'down') {
    const index = this.columns.indexOf(column);
    const newIndex = dir === 'up' ? 1 : -1;
    const temp = this.columns[index - newIndex];
    this.columns[index - newIndex] = column;
    this.columns[index] = temp;
    this.calculateSelectedColumns();
  }

  calculateSelectedColumns() {
    this.selectedColumns = this.columns.filter(col => this.enabled.has(col));
    localStorage.setItem('columns', this.selectedColumns.join());
  }
}
