import EasingType from '../Enums/EasingType';
import InputCather from '../Plugins/Input/InputCatcher';
import InputManager from '../Plugins/Input/InputManager';
import { InputManagerData } from '../Plugins/Input/InputManagerData';
import InputTypes from '../Plugins/Input/InputTypes';

const { ccclass, property } = cc._decorator;

@ccclass
export default class Button extends cc.Component {
    @property(cc.Node) holder: cc.Node = null;

    private inputCatcher: InputCather = null;
    private tween: cc.Tween<cc.Node> = null;
    private duration: number = 0.15;

    onLoad() {
        this.inputCatcher = this.node.getComponent(InputCather);
        InputManager.getInstance().on(InputTypes.Down, this.onDown, this);
        InputManager.getInstance().on(InputTypes.Up, this.onUp, this);
    }

    private onDown(data: InputManagerData): void {
        if (data.touchSource !== this.inputCatcher.inputSource) return;

        if (this.tween) this.tween.stop();

        this.tween = cc.tween<cc.Node>(this.holder || this.node).to(this.duration,
            { scale: 0.9 },
            { easing: cc.easing[EasingType.quadIn] }
        ).start();
    }

    private onUp(data: InputManagerData): void {
        if (data.touchSource !== this.inputCatcher.inputSource) return;

        if (this.tween) this.tween.stop();

        this.tween = cc.tween<cc.Node>(this.holder || this.node).to(this.duration,
            { scale: 1 },
            { easing: cc.easing[EasingType.quadOut] }
        ).start();
    }

}
