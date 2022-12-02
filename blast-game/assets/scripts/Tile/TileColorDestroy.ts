import Tile, { TileConfig } from './Tile';
import { ColorDestroy } from './TileConstants';

const { ccclass, property } = cc._decorator;

@ccclass('TileColorConfig')
export class TileColorConfig extends TileConfig {
    @property({ type: cc.Enum(ColorDestroy) }) typeDestroy: ColorDestroy = ColorDestroy.Red;
    @property({ type: cc.Integer }) matchCount: number = 2;
}

@ccclass
export default class TileColorDestroy extends Tile {
    @property({ type: TileColorConfig, override: true }) config: TileColorConfig = null;

    public init<T extends TileColorConfig>(initData: T): void {
        this.config.spriteFrame = initData.spriteFrame;
        this.config.typeDestroy = initData.typeDestroy;
        this.config.matchCount = initData.matchCount;
    }
}
