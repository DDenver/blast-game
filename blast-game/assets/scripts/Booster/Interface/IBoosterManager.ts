import { BoosterConfig } from '../BoosterConfig';
import IBooster from './IBooster';
import IBoosterPayload from './IBoosterPayload';

export default interface IBoosterManager {
    boosterConfigs: BoosterConfig[],
    boosters: IBooster[];
    readonly activeBoosterPayload: IBoosterPayload,
    activateBooster(booster: IBooster): void,
    useActiveBooster(): void,
    init(): void,// todo get from LevelConfigs
    enable(): void,
    disable(): void,
}
