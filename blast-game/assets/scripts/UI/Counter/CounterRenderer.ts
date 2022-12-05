const { ccclass, property } = cc._decorator;

@ccclass
export default class CounterRenderer extends cc.Component {
    @property(cc.Label) labalValue: cc.Label = null;

    public setValue(v: number): void {
        this.labalValue.string = '' + v;
    }
}
