import { BoosterConfig } from '../BoosterConfig';
import IBoosterManager from './IBoosterManager';

export default interface IBooster {
    config: BoosterConfig,
    init(manager: IBoosterManager, config: BoosterConfig): void,
    enable(): void,
    disable(): void,
    getCount(): number,
    use(): void,
    onTap(): void,
}


