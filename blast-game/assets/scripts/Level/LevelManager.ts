import BoosterManager from '../Booster/BoosterManager';
import IBoosterManager from '../Booster/Interface/IBoosterManager';
import Events from '../Enums/Events';
import Field from '../Field/Field';
import TilesCreator from '../Tile/TilesCreator';
import Counter from '../UI/Counter/Counter';
import PauseMenu from '../UI/PauseMenu/PauseMenu';
import ProgressBar from '../UI/ProgressBar/ProgressBar';
import { LevelConfig } from './LevelConfig';

const { ccclass, property } = cc._decorator;

@ccclass
export default class LevelManager extends cc.Component {
    @property(PauseMenu) pauseMenu: PauseMenu = null;
    @property(Counter) scoreCounter: Counter = null;
    @property(Counter) stepsCounter: Counter = null;
    @property(ProgressBar) progressBar: ProgressBar = null;
    @property(BoosterManager) boosterManager: IBoosterManager = null;
    @property(Field) field: Field = null;
    @property(TilesCreator) tilesCreator: TilesCreator = null;

    @property(LevelConfig) config: LevelConfig = null;

    private levelNumber: number = 0;

    onLoad() {
        cc.systemEvent.on(Events.START_LEVEL.toString(), this.onStartLevel, this);
        cc.systemEvent.on(Events.UPDATE_SCORE.toString(), this.onUpdateScore, this);
        cc.systemEvent.on(Events.STEP_COMPLETED.toString(), this.onStepCompleted, this);
    }

    public pause(): void {
        this.field.disable();
        this.boosterManager.disable();
    }

    public resume(): void {
        this.field.enable();
        this.boosterManager.enable();
    }

    public leave(): void {
        this.pause();
        cc.systemEvent.emit(Events.LEAVE_LEVEL.toString(), {
            steps: this.stepsCounter.getCurrentValue(),
            score: this.scoreCounter.getCurrentValue(),
            isFail: false,
        });
    }

    private onStartLevel(config: LevelConfig, levelNumber: number): void {
        this.levelNumber = levelNumber;

        this.boosterManager.init(config.boosters);
        this.boosterManager.enable();

        this.tilesCreator.init(this.field.renderer, config.tiles, config.fieldSize.width * config.fieldSize.height);
        this.field.init(config.fieldSize);

        this.stepsCounter.init({
            startValue: config.steps,
            incrementValue: -1,
            threshold: 0,
            callback: async () => {
                this.pause();
            }
        });

        this.scoreCounter.init({
            startValue: 0,
            incrementValue: config.scoreStep,
        });

        this.progressBar.init({
            goal: config.score,
            callback: async () => {
                this.pause();
            }
        });

        this.pauseMenu.init(this);
    }

    private onUpdateScore(multiplier: number = 1): void {
        this.scoreCounter.updateValue(multiplier);
        this.progressBar.updateProgress(this.scoreCounter.getCurrentValue());
    }
    private async onStepCompleted(): Promise<void> {
        this.stepsCounter.updateValue();

        if (this.progressBar.isGoalComplete) {
            await this.field.waitTimer(1.5);

            cc.systemEvent.emit(Events.COMPLETE_LEVEL.toString(), {
                steps: this.stepsCounter.getCurrentValue(),
                score: this.scoreCounter.getCurrentValue(),
                isNextLevel: true,
                level: this.levelNumber,
            });
        }

        if (this.stepsCounter.thresholdReached) {
            await this.field.waitTimer(1);

            cc.systemEvent.emit(Events.FAIL_LEVEL.toString(),
                {
                    steps: this.stepsCounter.getCurrentValue(),
                    score: this.scoreCounter.getCurrentValue(),
                    isFail: true,
                });
        }
    }
}
