import { Component, OnInit, ViewChild} from '@angular/core';
import {MatTable} from '@angular/material/table';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { IHabit } from '../common/models'
import { data } from '../common/mock-data'
import { HabitsService } from '../habits.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent implements OnInit {
  data: IHabit[];
  days: string[] = ["Habit"];
  allSelectedHabits: {data: IHabit, date: string}[] = []
  newData: Observable<IHabit>;
  shouldSelectDate: boolean = true;

  @ViewChild(MatTable) table: MatTable<IHabit>;

  constructor(private habitsService: HabitsService) {
    this.newData = this.habitsService.$habitToAdd

    this.newData.pipe(
      tap(x => {
        this.data.push(x)
        this.table.renderRows()
      }) 
    ).subscribe()


    this.data = data
  }

  ngOnInit(): void {
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
}
