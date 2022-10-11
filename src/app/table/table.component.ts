import { Component, OnInit, ViewChild} from '@angular/core';
import { MatTable } from '@angular/material/table';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { IHabit, IMonthWithData } from '../common/models'
import { data, months } from '../common/mock-data'
import { HabitsService } from '../habits.service';

import {MatSnackBar} from '@angular/material/snack-bar';


// TODO refactor

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent implements OnInit {
  data: {months: IMonthWithData[]};
  days: string[] = [];
  allSelectedHabits: {data: IHabit, date: string}[] = [];
  currentMonth: IMonthWithData;
  months: {id: number, name: string}[] = months;
  
  shouldSelectDate: boolean = true;
  newData: Observable<IHabit>;
  
  @ViewChild(MatTable) table: MatTable<IHabit>;


  constructor(
    private habitsService: HabitsService,
    private _snackBar: MatSnackBar
    ) {
    this.newData = this.habitsService.$habitToAdd

    this.newData.pipe(
      tap(x => {
        this.currentMonth.habits.push(x)
        this.table.renderRows()
      }) 
    ).subscribe()


    this.data = data
  }

  ngOnInit(): void {
    // Sets month to real time current month
    this.currentMonth = this.data.months.find((m) => {
      return m.id === new Date().getMonth() + 1
    })

    if (!this.currentMonth) this.currentMonth = this.data.months[0]

    for (let i = 1; i < 31; i++) {
      if (i == 1) this.days.push("Habit")
      this.days.push(i.toString());
    }
  }

  onDateClick(data, day) {
    console.log(data, day)
    this.allSelectedHabits.forEach((item) => {
      if (item.data.name == data.name && item.date == day) {
        this.shouldSelectDate = false;
        return;
      } else {
        this.shouldSelectDate = true;
      }
    })

    if (this.shouldSelectDate) {
      this.allSelectedHabits.push({
        data,
        date: day
      })
    }
  }

  onSelectMonth(month: {id: number, name: string}) {
    const selectedMonth = this.data.months.find((m) => {
      return m.id == month.id
    })

    if (!selectedMonth) return;

    if (selectedMonth.habits.length == 0) {
      this._snackBar.open('No habits for this month', 'Close')
    }
 
    this.currentMonth = selectedMonth
    this.table.renderRows()
  }
}
