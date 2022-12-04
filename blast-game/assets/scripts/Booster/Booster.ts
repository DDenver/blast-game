import { BoosterConfig } from './BoosterConfig';
import IBooster from './Interface/IBooster';

const { ccclass, property } = cc._decorator;

@ccclass
export default class Booster extends cc.Component implements IBooster {
    @property(BoosterConfig) config: BoosterConfig = null;

    counter: number;

    init(config: BoosterConfig): void {
        throw new Error('Method not implemented.');
    }
    enable(): void {
        throw new Error('Method not implemented.');
    }
    disable(): void {
        throw new Error('Method not implemented.');
    }
    onTap(): void {
        throw new Error('Method not implemented.');
    }

}
