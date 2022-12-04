import { BoosterConfig } from '../BoosterConfig';

export default interface IBooster {
    config: BoosterConfig,
    counter: number,
    init(config: BoosterConfig): void,
    enable(): void,
    disable(): void,
    onTap(): void,
}


