import { BoosterTypes } from './BoosterTypes';

const { ccclass, property } = cc._decorator;

@ccclass('BoosterConfig')
export class BoosterConfig {
    @property({ type: cc.Enum(BoosterTypes) }) type: BoosterTypes = BoosterTypes.Boomb
    @property({ type: cc.SpriteFrame }) icon: cc.SpriteFrame = null;

    @property({ type: cc.Integer }) startCount: number = 0;

    @property({
        type: cc.Integer,
        visible: false,
    }) radius: number = 0;
}
