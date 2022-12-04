import EasingType from '../Enums/EasingType';
import IBoosterRenderer from './Interface/IBoosterRenderer';

const { ccclass, property } = cc._decorator;

@ccclass
export default class BoosterRenderer extends cc.Component implements IBoosterRenderer {
    @property(cc.Sprite) icon: cc.Sprite = null;

    @property(cc.Label) counter: cc.Label = null;

    @property({ type: cc.Enum(EasingType) }) easing: EasingType = EasingType.quadInOut;


    private tween: cc.Tween<cc.Node> = null;
    private tweenDuration: number = 0.2;

    public init(icon: cc.SpriteFrame, count: number): void {
        this.icon.spriteFrame = icon;
        this.setCount(count);
    }

    public setCount(count: number): void {
        this.counter.string = '' + count;
    }

    public activate(): void {
        this.playScaleTween(1.2);
    }

    public deactivate(): void {
        this.playScaleTween(1);
    }

    private playScaleTween(scale: number): void {
        if (this.tween) this.tween.stop();

        this.tween = cc.tween<cc.Node>(this.icon.node).to(this.tweenDuration,
            { scale },
            { easing: cc.easing[EasingType[this.easing]] }
        ).start();
    }
}
