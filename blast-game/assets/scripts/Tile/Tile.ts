import EasingType from '../Enums/EasingType';
import Events from '../Enums/Events';
import { TileAreaConfig } from './TileAreaDestroy';
import { TileColorConfig } from './TileColorDestroy';
import { TileAbilityTypes } from './TileConstants';
import { TileLineConfig } from './TileLineDestroy';
import TileRenderer from './TileRenderer';

const { ccclass, property } = cc._decorator;

@ccclass('TileConfig')
export class TileConfig {
    @property({ type: cc.Enum(TileAbilityTypes) }) ability: TileAbilityTypes = TileAbilityTypes.ColorDestroy;
    @property({ type: cc.SpriteFrame }) spriteFrame: cc.SpriteFrame = null;
}

@ccclass()
export default abstract class Tile extends cc.Component {
    @property() config: TileColorConfig | TileLineConfig | TileAreaConfig = null;

    public needMatch: boolean = false;

    protected tileRenderer: TileRenderer = null;

    onLoad() {
        this.tileRenderer = this.node.getComponent(TileRenderer);
        this.reset();
    }

    public abstract init(initData): void;

    public setScale(scale: number) {
        this.tileRenderer.setScale(scale);
    }

    public reset(): void {
        this.needMatch = false;
        this.tileRenderer.reset();
    }

    public setPosition(pos: cc.Vec2): void {
        this.tileRenderer.setPosition(pos);
    }

    public getPosition(): cc.Vec2 {
        return this.tileRenderer.getPosition();
    }

    public fallDown(pos: cc.Vec2, duration: number, easing: EasingType): void {
        this.tileRenderer.moveTo(pos, duration, easing);
    }

    public async remove(): Promise<void> {
        await this.tileRenderer.hide();
        cc.systemEvent.emit(Events.TILE_REMOVED.toString(), this);
    }

    public show(useAnim: boolean = true): void {
        this.tileRenderer.show(useAnim);
    }

    public async focus(): Promise<void>{
        await this.tileRenderer.playFocusAnim();
    }

    public async cantMatching(): Promise<void>{
        await this.tileRenderer.playCantMatching();
    }
}
