import { LevelBoosterConfig } from '../Level/LevelBoosterConfig';
import Booster from './Booster';
import { BoosterConfig } from './BoosterConfig';
import { BoosterTypes } from './BoosterTypes';
import IBooster from './Interface/IBooster';
import IBoosterManager from './Interface/IBoosterManager';
import IBoosterPayload from './Interface/IBoosterPayload';

const { ccclass, property } = cc._decorator;

@ccclass
export default class BoosterManager extends cc.Component implements IBoosterManager {
    @property(Booster) boosters: IBooster[] = [];
    @property(BoosterConfig) boosterIconsConfigs: BoosterConfig[] = [];

    private _activeBoosterPayload: IBoosterPayload = null;
    get activeBoosterPayload(): IBoosterPayload {
        return this._activeBoosterPayload;
    }

    private activeBooster: IBooster = null;

    public init(configs: LevelBoosterConfig[]): void {
        this.boosters.forEach((booster, i) => {
            const apllyconfig: BoosterConfig = {
                type: configs[i].type,
                icon: this.boosterIconsConfigs.find(b => b.type === configs[i].type).icon,
                startCount: configs[i].startCount,
                radius: configs[i].radius,
            }
            booster.init(this, apllyconfig);
        });
    }

    public enable(): void {
        this.toggleEnableBoosters(true);
    }

    public disable(): void {
        this.toggleEnableBoosters(false);
    }

    public activateBooster(booster: IBooster): void {
        this._activeBoosterPayload = this.getBoosterPayload(booster);
        this.activeBooster = booster;
        this.toggleEnableBoosters(false);
    }

    public useActiveBooster(): void {
        this._activeBoosterPayload = null;
        this.toggleEnableBoosters(true);
        this.activeBooster.use();
    }

    private toggleEnableBoosters(isEnable: boolean): void {
        this.boosters.forEach((booster) => {
            if (isEnable) {
                booster.enable();
            } else {
                booster.disable();
            }
        })
    }

    private getBoosterPayload(booster: IBooster): IBoosterPayload {
        const payload: IBoosterPayload = {
            type: booster.config.type,
        }

        switch (booster.config.type) {
            case BoosterTypes.Boomb:
                payload.radius = booster.config.radius;
                break;
            case BoosterTypes.MegaBoomb:
                payload.radius = booster.config.radius;
                break;
            default:
                break;
        }

        return payload;
    }
}
