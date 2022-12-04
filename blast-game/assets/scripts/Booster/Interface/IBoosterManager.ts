import { BoosterConfig } from '../BoosterConfig';
import { BoosterTypes } from '../BoosterTypes';

export default interface IBoosterManager {
    boosterConfigs: BoosterConfig[],
    activeBooster: BoosterTypes,
    // init(config: BoosterConfig[]): void, // todo get from LevelConfigs
    activateBooster(type: BoosterTypes): void,
}
