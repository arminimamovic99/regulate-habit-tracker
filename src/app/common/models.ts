export interface IHabit {
    id: number;
    name: string;
    count: number;
}

export interface IMonthWithData {
    id: number,
    name: string,
    habits: IHabit[]
}