import { BoosterConfig } from '../BoosterConfig';
import { BoosterTypes } from '../BoosterTypes';
import IBooster from './IBooster';

export default interface IBoosterManager {
    boosterConfigs: BoosterConfig[],
    boosters: IBooster[];
    readonly activeBoosterType: BoosterTypes,
    activateBooster(booster: IBooster): void,
    useActiveBooster(): void,
    init(): void,// todo get from LevelConfigs
    enable(): void,
    disable(): void,
}
