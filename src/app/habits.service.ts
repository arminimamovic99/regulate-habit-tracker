import { Injectable } from '@angular/core';
import { IHabit } from './common/models'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HabitsService {
  $habitToAdd = new Subject<IHabit>();

  constructor() { }

  createHabit(data: IHabit) {
    this.$habitToAdd.next(data);
  }
}
