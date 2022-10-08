import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

import { AddHabitComponent } from './add-habit/add-habit.component'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'regulate-habit-tracker';

  constructor(private dialog: MatDialog) { }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;

    this.dialog.open(AddHabitComponent, dialogConfig);
  }
}
