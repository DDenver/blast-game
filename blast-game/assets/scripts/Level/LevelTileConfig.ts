import { TileAreaConfig } from '../Tile/TileAreaDestroy';

const { ccclass, property } = cc._decorator;

@ccclass('LevelTileConfig')
export class LevelTileConfig extends TileAreaConfig {
    @property({ type: cc.SpriteFrame, visible: false, override: true }) spriteFrame: cc.SpriteFrame = null;
}

