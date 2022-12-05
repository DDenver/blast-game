import Events from './Enums/Events';
import SceneNames from './Enums/SceneNames';
import Settings from "./Plugins/Settings";
import { IResultData } from './UI/ResultMenu/IResultData';

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {

    private settings: Settings = new Settings();

    onLoad(): void {
        this.subscribeEvents();

        cc.game.addPersistRootNode(this.node);
    }

    start(): void {
        this.windowResized();

        // this.scheduleOnce(() => {
        //     this.newGame();
        // }, 0.5);
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
        this.loadScene(SceneNames.GAME, () => {
            cc.systemEvent.emit(Events.START_LEVEL.toString(), 'config');
        });
    }

    private restartGame() {
        this.loadScene(SceneNames.GAME);
    }

    private completeLevel(data: IResultData) {
        this.loadScene(SceneNames.RESULT, () => {
            cc.systemEvent.emit(Events.SHOW_RESULT.toString(), data);
        });
    }
    private failLevel(data: IResultData) {
        this.loadScene(SceneNames.RESULT, () => {
            cc.systemEvent.emit(Events.SHOW_RESULT.toString(), data);
        });
    }
    private leaveLevel(data: IResultData) {
        this.loadScene(SceneNames.RESULT, () => {
            cc.systemEvent.emit(Events.SHOW_RESULT.toString(), data);
        });
    }

    private nextLevel() {
        this.loadScene(SceneNames.GAME);
    }

    private mainMenu() {
        this.loadScene(SceneNames.MAIN);
    }
}
