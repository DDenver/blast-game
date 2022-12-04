import { LevelBoosterConfig } from '../../Level/LevelBoosterConfig';
import { BoosterConfig } from '../BoosterConfig';
import IBooster from './IBooster';
import IBoosterPayload from './IBoosterPayload';

export default interface IBoosterManager {
    boosterIconsConfigs: BoosterConfig[],
    boosters: IBooster[];
    readonly activeBoosterPayload: IBoosterPayload,
    activateBooster(booster: IBooster): void,
    useActiveBooster(): void,
    init(config: LevelBoosterConfig[]): void,
    enable(): void,
    disable(): void,
}
