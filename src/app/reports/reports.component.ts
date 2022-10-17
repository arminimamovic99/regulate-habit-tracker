import { Component, OnInit } from '@angular/core';
import { StateService } from '../state/state.service';
import { MatDialogRef } from '@angular/material/dialog';
import { IHabit } from '../common/models';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.sass']
})
export class ReportsComponent implements OnInit {
  currentMonthHabits: IHabit[]
  hasDataBeenSet = false;
  habitsAndCompletion: {id: number, name: string, count: number, goalReached: boolean}[] = []

  constructor(
    private dialogRef: MatDialogRef<ReportsComponent>,
    private _stateService: StateService
  ) { }

  ngOnInit(): void {
    this.currentMonthHabits = this._stateService._currentState.currentMonth.habits

    if (this.currentMonthHabits) {
      this.currentMonthHabits.forEach((habit) => {
        let timesHabitHasBeenCompletedInCurrentMonth = this._stateService._currentState.
        currentMonth.
        selectedHabits.
        filter((h) => h.habitId === habit.id).length

        let hasCompletionGoalBeenReached = true;
        if (timesHabitHasBeenCompletedInCurrentMonth < habit.count) 
          hasCompletionGoalBeenReached = false;

        this.habitsAndCompletion.push({
          id: habit.id, 
          name: habit.name,
          count: timesHabitHasBeenCompletedInCurrentMonth, 
          goalReached: hasCompletionGoalBeenReached
        })
      })
    }
  }

  close() {
    this.dialogRef.close();
  }
}
