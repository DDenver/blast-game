import { LevelBoosterConfig } from './LevelBoosterConfig';
import { LevelTileConfig } from './LevelTileConfig';

const { ccclass, property } = cc._decorator;

@ccclass('LevelConfig')
export class LevelConfig {
    @property(LevelBoosterConfig) boosters: LevelBoosterConfig[] = [];
    @property(LevelTileConfig) tiles: LevelTileConfig[] = [];
}
