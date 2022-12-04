import { BoosterConfig } from '../Booster/BoosterConfig';
import { BoosterTypes } from '../Booster/BoosterTypes';

const { ccclass, property } = cc._decorator;

@ccclass('LevelBoosterConfig')
export class LevelBoosterConfig extends BoosterConfig {
    @property({ type: cc.SpriteFrame, visible: false, override: true }) icon: cc.SpriteFrame = null;
    
    @property({
        type: cc.Integer,
        visible() { return this.type === BoosterTypes.Boomb || this.type === BoosterTypes.MegaBoomb; },
        override: true
    }) radius: number = 0;
}
