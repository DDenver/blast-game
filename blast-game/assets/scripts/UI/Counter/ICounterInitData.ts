export interface ICounterInitData {
    startValue: number;
    incrementValue: number;
    threshold?: number;
    callback?(): void;
}
