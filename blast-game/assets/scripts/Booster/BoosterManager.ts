import Booster from './Booster';
import { BoosterConfig } from './BoosterConfig';
import { BoosterTypes } from './BoosterTypes';
import IBooster from './Interface/IBooster';
import IBoosterManager from './Interface/IBoosterManager';

const { ccclass, property } = cc._decorator;

@ccclass
export default class BoosterManager extends cc.Component implements IBoosterManager {
    @property(Booster) boosters: IBooster[] = [];
    @property(BoosterConfig) boosterConfigs: BoosterConfig[] = [];

    private _activeBoosterType: BoosterTypes = BoosterTypes.None;
    get activeBoosterType(): BoosterTypes {
        return this._activeBoosterType;
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
        this._activeBoosterType = booster.config.type;
        this.activeBooster = booster;
        this.toggleEnableBoosters(false);
    }

    public useActiveBooster(): void {
        this._activeBoosterType = null;
        this.activeBooster.use();
        this.toggleEnableBoosters(true);
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
}
