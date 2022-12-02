import Tile, { TileConfig } from './Tile';
import { LineDestroy } from './TileConstants';

const { ccclass, property } = cc._decorator;

@ccclass('TileLineConfig')
export class TileLineConfig extends TileConfig {
    @property({ type: cc.Enum(LineDestroy) }) typeDestroy: LineDestroy = LineDestroy.Vertical;
}

@ccclass
export default class TileLineDestroy extends Tile {
    @property({ type: TileLineConfig, override: true }) config: TileLineConfig = null;

    public init<T extends TileLineConfig>(initData: T): void {
        this.config.spriteFrame = initData.spriteFrame;
        this.tileRenderer.setSpriteFrame(initData.spriteFrame);
        this.config.typeDestroy = initData.typeDestroy;
    }
}
