import { Component, OnInit, ViewChild} from '@angular/core';
import { MatTable } from '@angular/material/table';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { IHabit, IMonthWithData, IData } from '../common/models'
import { data, months } from '../common/mock-data'
import { HabitsService } from '../habits.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { StateService } from '../state/state.service';

/* State service usage is practically not needed because at this point only one component uses the data 
 But it has been implemented for practice
*/
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent implements OnInit {
  data: IData;
  days: string[] = [];
  allSelectedHabits: {data: IHabit, date: string}[] = [];
  currentMonth: IMonthWithData;
  months: {id: number, name: string}[] = months;
  
  shouldSelectDate: boolean = true;
  newData: Observable<IHabit>;
  
  @ViewChild(MatTable) table: MatTable<IHabit>;


  constructor(
    private habitsService: HabitsService,
    private stateService: StateService,
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
    this.stateService.setData(this.data)
  }

  ngOnInit(): void {
    // Sets month to real time current month
    this.currentMonth = this.data.months.find((m) => {
      return m.id === new Date().getMonth() + 1
    })

    this.stateService.setCurrentMonth(this.currentMonth)

    if (!this.currentMonth) this.currentMonth = this.data.months[0]

    for (let i = 1; i < 31; i++) {
      if (i == 1) this.days.push("Habit")
      this.days.push(i.toString());
    }
  }

  onDateClick(data: { id: any; }, day: any) {
    this.currentMonth.selectedHabits.push({
      habitId: data.id,
      date: day
    })

    this.stateService.setCurrentMonth(this.currentMonth)
  }

  onSelectMonth(month: {id: number, name: string}) {
    const selectedMonth = this.data.months.find((m) => m.id == month.id)

    if (!selectedMonth) return;

    if (selectedMonth.habits.length == 0) {
      this._snackBar.open('No habits for this month', 'Close')
    }
 
    this.currentMonth = selectedMonth
    this.table.renderRows()
  }
}
