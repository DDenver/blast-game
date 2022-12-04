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
    @property(BoosterConfig) boosterConfigs: BoosterConfig[] = [];

    private _activeBoosterPayload: IBoosterPayload = null;
    get activeBoosterPayload(): IBoosterPayload {
        return this._activeBoosterPayload;
    }

    private activeBooster: IBooster = null;

    onLoad() {
        this.init(); // todo config get from LevelConfigs
        this.enable();
    }

    public init(): void { // todo config get from LevelConfigs
        this.boosters.forEach((booster, i) => {
            booster.init(this, this.boosterConfigs[i]);
        });
    }

    public enable(): void {
        this.toggleEnableBoosters(true);
    }

    public disable(): void {
        this.toggleEnableBoosters(false);
    }

    public activateBooster(booster: IBooster): void {
        this._activeBoosterPayload = this.getBoosterPayload(booster.config.type);
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

    private getBoosterPayload(type: BoosterTypes): IBoosterPayload {
        const payload: IBoosterPayload = {
            type
        }

        switch (type) {
            case BoosterTypes.Boomb:
                payload.radius = 4;
                break;
            case BoosterTypes.MegaBoomb:
                payload.radius = -1;
                break;
            default:
                break;
        }

        return payload;
    }
}
