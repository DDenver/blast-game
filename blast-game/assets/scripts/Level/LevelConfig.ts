import { LevelBoosterConfig } from './LevelBoosterConfig';
import { LevelTileConfig } from './LevelTileConfig';

const { ccclass, property } = cc._decorator;

@ccclass('LevelConfig')
export class LevelConfig {
    @property(cc.Integer) steps: number = 15;
    @property(cc.Integer) score: number = 800;
    @property(cc.Integer) scoreStep: number = 25;
    @property(cc.Size) fieldSize: cc.Size = cc.Size.ZERO;

    @property(LevelBoosterConfig) boosters: LevelBoosterConfig[] = [];
    @property(LevelTileConfig) tiles: LevelTileConfig[] = [];
}
