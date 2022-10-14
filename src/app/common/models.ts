export interface IHabit {
    id: number;
    name: string;
    count: number;
}

export interface IMonthWithData {
    id: number,
    name: string,
    habits: IHabit[],
    selectedHabits?: {habitId: number, date: string}[]
}

export interface IData {
    months: IMonthWithData[];
}

export interface IGlobalState {
    currentMonth: IMonthWithData;
    data: IData;
}