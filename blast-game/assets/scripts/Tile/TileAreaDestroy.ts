import Tile, { TileConfig } from './Tile';
import { AreaDestroy } from './TileConstants';

const { ccclass, property } = cc._decorator;

@ccclass('TileAreaConfig')
export class TileAreaConfig extends TileConfig {
    @property({ type: cc.Enum(AreaDestroy) }) typeDestroy: AreaDestroy = AreaDestroy.Default;
    @property(cc.Integer) radius: number = 5;
}

@ccclass
export default class TileAreaDestroy extends Tile {
    @property({ type: TileAreaConfig, override: true }) config: TileAreaConfig = null;

    public init<T extends TileAreaConfig>(initData: T): void {
        this.config.spriteFrame = initData.spriteFrame;
        this.tileRenderer.setSpriteFrame(initData.spriteFrame);
        this.config.typeDestroy = initData.typeDestroy;
        this.config.radius = initData.radius;
    }
}