import Events from './Enums/Events';
import SceneNames from './Enums/SceneNames';
import { LevelConfig } from './Level/LevelConfig';
import InputManager from './Plugins/Input/InputManager';
import Settings from "./Plugins/Settings";
import Utilities from './Plugins/Utilities';
import ScoreStorage from './ScoreStorage';
import { IResultData } from './UI/ResultMenu/IResultData';

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {

    @property(LevelConfig) levelsConfig: LevelConfig[] = [];

    private settings: Settings = new Settings();
    private currentLevel: number = 1;

    onLoad(): void {
        new ScoreStorage();
        InputManager.getInstance();

        this.subscribeEvents();

        cc.game.addPersistRootNode(this.node);
    }

    start(): void {
        this.windowResized();
    }


    private subscribeEvents(): void {
        cc.view.setResizeCallback(() => {
            this.windowResized();
        });

        cc.systemEvent.on(Events.NEW_GAME.toString(), this.newGame, this);
        cc.systemEvent.on(Events.RESTART_GAME.toString(), this.restartGame, this);
        cc.systemEvent.on(Events.COMPLETE_LEVEL.toString(), this.completeLevel, this);
        cc.systemEvent.on(Events.FAIL_LEVEL.toString(), this.failLevel, this);
        cc.systemEvent.on(Events.LEAVE_LEVEL.toString(), this.leaveLevel, this);
        cc.systemEvent.on(Events.NEXT_LEVEL.toString(), this.nextLevel, this);
        cc.systemEvent.on(Events.MAIN_MENU.toString(), this.mainMenu, this);
    }

    private windowResized(): void {
        this.settings.updateSettings();
        cc.systemEvent.emit(Events.WINDOW_RESIZED.toString(), this.settings);
    }

    private loadScene(name: SceneNames = SceneNames.MAIN, callback?: () => void): void {
        cc.director.loadScene(name, () => {
            if (callback) callback();
            this.windowResized();

            console.log(`Scene ${name} Loaded...`);
        });
    }


    private newGame() {
        this.currentLevel = 1;

        this.loadScene(SceneNames.GAME, () => {
            cc.systemEvent.emit(Events.START_LEVEL.toString(), this.levelsConfig[this.currentLevel - 1], this.currentLevel);
        });
    }

    private restartGame() {
        this.currentLevel = 1;

        this.loadScene(SceneNames.GAME, () => {
            cc.systemEvent.emit(Events.START_LEVEL.toString(), this.levelsConfig[this.currentLevel - 1], this.currentLevel);
        });
    }

    private completeLevel(data: IResultData) {
        this.saveResultData(data);

        this.loadScene(SceneNames.RESULT, () => {
            cc.systemEvent.emit(Events.SHOW_RESULT.toString(), data);
        });
    }
    private failLevel(data: IResultData) {
        this.saveResultData(data);

        this.loadScene(SceneNames.RESULT, () => {
            cc.systemEvent.emit(Events.SHOW_RESULT.toString(), data);
        });
    }
    private leaveLevel(data: IResultData) {
        this.saveResultData(data);

        this.loadScene(SceneNames.RESULT, () => {
            cc.systemEvent.emit(Events.SHOW_RESULT.toString(), data);
        });
    }

    private nextLevel() {
        const nextLevelConfig = (this.currentLevel >= this.levelsConfig.length) ?
            Utilities.getRandomElementFromArray(this.levelsConfig)
            : this.levelsConfig[this.currentLevel];
        this.currentLevel++;


        this.loadScene(SceneNames.GAME, () => {
            cc.systemEvent.emit(Events.START_LEVEL.toString(), nextLevelConfig, this.currentLevel);
        });
    }

    private mainMenu() {
        this.loadScene(SceneNames.MAIN);
    }

    private saveResultData(data: IResultData): void {
        const currentData = ScoreStorage.instance.get();

        if (currentData.score <= data.score) {
            const newData = {
                score: data.score,
                steps: data.steps,
                level: this.currentLevel
            }
            ScoreStorage.instance.save(newData);
        }
    }
}
