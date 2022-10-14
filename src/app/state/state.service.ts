import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IGlobalState, IMonthWithData, IData } from '../common/models'

@Injectable({
  providedIn: 'root'
})
export class StateService {
  _currentState: IGlobalState = {
    currentMonth: null,
    data: null
  };
  _currentStateEmitter = new Subject<IGlobalState>();

  constructor() { }

  setState(state: IGlobalState) {
    this._currentState = state;
  }

  setCurrentMonth(month: IMonthWithData) {
    this._currentState.currentMonth = month
    this._currentStateEmitter.next(this._currentState)
  }

  setData(data: IData) {
    this._currentState.data = data
    this._currentStateEmitter.next(this._currentState)
  }
}
