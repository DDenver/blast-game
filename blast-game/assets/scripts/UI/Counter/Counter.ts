import CounterRenderer from './CounterRenderer';
import { ICounterInitData } from './ICounterInitData';

const { ccclass, property } = cc._decorator;

@ccclass
export default class Counter extends cc.Component {
    private renderer: CounterRenderer = null;

    private startValue: number = 0;
    private currentValue: number = 0;
    private incrementValue: number = 0;

    private threshold: number = 0;
    private callback: () => void = null;

    private _thresholdReached: boolean = false;
    public get thresholdReached(): boolean {
        return this._thresholdReached;
    }

    onLoad() {
        this.renderer = this.node.getComponent(CounterRenderer);
    }

    public init(data: ICounterInitData): void {
        this.startValue = data.startValue;
        this.currentValue = data.startValue;
        this.incrementValue = data.incrementValue;

        this.threshold = data?.threshold;
        this.callback = data?.callback;

        this.renderer.setValue(this.currentValue);
        this._thresholdReached = false;
    }

    public updateValue(multiplier: number = 1): void {
        this.currentValue += this.incrementValue * multiplier;

        if (this.callback) {
            const delta = this.threshold - this.startValue;

            if ((delta > 0 && this.currentValue >= this.threshold)
                || (delta < 0 && this.currentValue <= this.threshold)
            ) {
                this._thresholdReached = true;
                this.callback();
            };
        }

        this.renderer.setValue(this.currentValue);
    }

    public getCurrentValue(): number {
        return this.currentValue;
    }

}
