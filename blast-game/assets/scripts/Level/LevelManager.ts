import BoosterManager from '../Booster/BoosterManager';
import IBoosterManager from '../Booster/Interface/IBoosterManager';
import Events from '../Enums/Events';
import Field from '../Field/Field';
import TilesCreator from '../Tile/TilesCreator';
import Counter from '../UI/Counter/Counter';
import PauseMenu from '../UI/PauseMenu/PauseMenu';
import { LevelConfig } from './LevelConfig';

const { ccclass, property } = cc._decorator;

@ccclass
export default class LevelManager extends cc.Component {
    @property(PauseMenu) pauseMenu: PauseMenu = null;
    @property(Counter) scoreCounter: Counter = null;
    @property(Counter) stepsCounter: Counter = null;
    @property(BoosterManager) boosterManager: IBoosterManager = null;
    @property(Field) field: Field = null;
    @property(TilesCreator) tilesCreator: TilesCreator = null;
    @property(cc.Size) fieldSize: cc.Size = cc.Size.ZERO;

    @property(LevelConfig) config: LevelConfig = null;

    private levelNumber: number = 0;

    onLoad() {
        cc.systemEvent.on(Events.START_LEVEL.toString(), this.onStartLevel, this);
    }

    public pause(): void {

    }

    public resume(): void {

    }

    public leave(): void {
        cc.systemEvent.emit(Events.LEAVE_LEVEL.toString());
    }

    private onStartLevel(config: LevelConfig): void {
        this.boosterManager.init(this.config.boosters);
        this.boosterManager.enable();

        this.tilesCreator.init(this.field.renderer, this.config.tiles);
        this.field.init(this.fieldSize);

        this.pauseMenu.init(this);
    }
}
