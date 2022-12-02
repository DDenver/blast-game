import EasingType from '../Enums/EasingType';
import Utilities from '../Plugins/Utilities';

const { ccclass, property } = cc._decorator;

enum AnimationNames {
    Show = 'tile_show',
    Hide = 'tile_hide',
}

@ccclass()
export default class TileRenderer extends cc.Component {
    @property(cc.Sprite) renderer: cc.Sprite = null;

    private animation: cc.Animation = null;
    private moveTween: cc.Tween = null;


    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.animation = this.node.getComponent(cc.Animation);
        // this.scheduleOnce(async () => {
        //     await this.hide();
        //     this.show();
        // }, 2)
    }

    public reset(): void {
        this.renderer.node.scale = 0.001;
    }

    public setScale(scale: number): void {
        this.node.scale = scale;
    }

    public setSpriteFrame(spriteFrame: cc.SpriteFrame): void {
        this.renderer.spriteFrame = spriteFrame;
    }

    public show(): void {
        this.animation.play(AnimationNames.Show);
    }

    public async hide(): Promise<void> {
        return new Promise((res) => {
            this.animation.play(AnimationNames.Hide);
            this.animation.once(cc.Animation.EventType.FINISHED, () => {
                res();
            });
        });
    }

    public setPosition(pos: cc.Vec2): void {
        this.node.setPosition(pos);
    }

    public moveTo(pos: cc.Vec2, duration: number, easing: EasingType = EasingType.linear): void {
        if (this.moveTween) this.moveTween.stop();

        this.moveTween = new cc.Tween<cc.Node>(this.node)
            .to(duration,
                { position: Utilities.convertToVec3(pos) },
                { easing: cc.easing[EasingType[easing]] }
            ).start();
    }
}
