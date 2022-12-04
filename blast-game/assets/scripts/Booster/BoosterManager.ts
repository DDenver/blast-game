import { BoosterConfig } from './BoosterConfig';
import { BoosterTypes } from './BoosterTypes';
import IBoosterManager from './Interface/IBoosterManager';

const { ccclass, property } = cc._decorator;

@ccclass
export default class BoosterManager extends cc.Component implements IBoosterManager {
    @property(BoosterConfig) boosterConfigs: BoosterConfig[] = [];

    activateBooster(type: BoosterTypes): void {
        throw new Error('Method not implemented.');
    }
    activeBooster: BoosterTypes;
}
