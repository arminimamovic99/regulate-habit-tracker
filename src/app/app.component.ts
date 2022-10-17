import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

import { AddHabitComponent } from './add-habit/add-habit.component'
import { ReportsComponent } from './reports/reports.component'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'regulate-habit-tracker';

  constructor(private dialog: MatDialog) { }

  openFormDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;

    this.dialog.open(AddHabitComponent, dialogConfig);
  }

  openReportsDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    
    this.dialog.open(ReportsComponent, dialogConfig)
  }
}
