import EasingType from '../../Enums/EasingType';
import Utilities from '../../Plugins/Utilities';

const { ccclass, property } = cc._decorator;

@ccclass
export default class ProgressBarRenderer extends cc.Component {

    @property(cc.Node) fillLine: cc.Node = null;
    @property({ type: cc.Enum(EasingType) }) easing: EasingType = EasingType.quadOut;
    @property(cc.Float) speed: number = 0.03;

    private startLinePosX: number = -621.5;
    private lineWidth: number = 1243;

    private tween: cc.Tween<cc.Node> = null;

    onLoad() {
        this.lineWidth = this.fillLine.width;
        this.startLinePosX = -this.lineWidth / 2;

        this.fillLine.x = this.startLinePosX;
    }

    public setProgress(progress: number): void {
        if (this.tween) this.tween.stop();
        const nextPosX = this.startLinePosX + Utilities.clamp(this.lineWidth * progress, 0, this.lineWidth);
        const duration = (nextPosX - this.fillLine.x) / this.speed;

        const newPos = this.fillLine.position.clone();
        newPos.x = nextPosX;

        this.tween = cc.tween<cc.Node>(this.fillLine).to(duration,
            { position: newPos },
            { easing: cc.easing[EasingType[this.easing]] }
        ).start();
    }
}
