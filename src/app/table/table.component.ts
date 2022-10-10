import { Component, OnInit, ViewChild} from '@angular/core';
import { MatTable } from '@angular/material/table';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { IHabit, IMonthWithData } from '../common/models'
import { data, months } from '../common/mock-data'
import { HabitsService } from '../habits.service';

// TODO refactor

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent implements OnInit {
  data: {Months: IMonthWithData[]};
  days: string[] = ["Habit"];
  allSelectedHabits: {data: IHabit, date: string}[] = [];
  currentMonth: IMonthWithData;
  months: {id: number, name: string}[] = months;
  
  shouldSelectDate: boolean = true;
  newData: Observable<IHabit>;
  
  @ViewChild(MatTable) table: MatTable<IHabit>;


  constructor(private habitsService: HabitsService) {
    this.newData = this.habitsService.$habitToAdd

    this.newData.pipe(
      tap(x => {
        this.data.Months[0].habits.push(x)
        this.table.renderRows()
      }) 
    ).subscribe()


    this.data = data
  }

  ngOnInit(): void {
    this.currentMonth = this.data.Months[0]

    for (let i = 1; i < 31; i++) {
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
    const selectedMonth = this.data.Months.find((m) => {
      return m.name == month.name
    })

    if (!selectedMonth) return;

    this.currentMonth = selectedMonth
    this.table.renderRows()
  }
}
