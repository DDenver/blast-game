import EasingType from '../Enums/EasingType';
import Utilities from '../Plugins/Utilities';

const { ccclass, property } = cc._decorator;

enum AnimationNames {
    Show = 'tile_show',
    Hide = 'tile_hide',
    Focus = 'tile_focus',
    CantMatching = 'tile_cant_matching',
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

    public show(useAnim: boolean = true): void {
        if (useAnim) {
            this.animation.play(AnimationNames.Show)
        } else {
            this.renderer.node.scale = 1;
        };
    }

    public async hide(): Promise<void> {
        await this.playAnimation(AnimationNames.Hide);
    }

    public async playFocusAnim(): Promise<void> {
        await this.playAnimation(AnimationNames.Focus);
    }

    public async playCantMatching(): Promise<void> {
        await this.playAnimation(AnimationNames.CantMatching);
    }

    public setPosition(pos: cc.Vec2): void {
        this.node.setPosition(pos);
    }

    public getPosition(): cc.Vec2 {
        return new cc.Vec2(this.node.x, this.node.y);
    }

    public moveTo(pos: cc.Vec2, duration: number, easing: EasingType = EasingType.linear): void {
        if (this.moveTween) this.moveTween.stop();

        this.moveTween = new cc.Tween<cc.Node>(this.node)
            .to(duration,
                { position: Utilities.convertToVec3(pos) },
                { easing: cc.easing[EasingType[easing]] }
            ).start();
    }

    private async playAnimation(name: AnimationNames): Promise<void> {
        return new Promise((res) => {
            this.animation.play(name);
            this.animation.once(cc.Animation.EventType.FINISHED, () => res());
        });
    }
}
