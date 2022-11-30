import Events from './Enums/Events';
import Settings from "./Plugins/Settings";


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
        this.scheduleOnce(() => {
            this.loadScene();
        }, 0.5)
    }


    private subscribeEvents(): void {
        cc.view.setResizeCallback(() => {
            this.windowResized();
        });

        cc.systemEvent.on(Events.NEW_GAME.toString(), this.newGame, this);
        cc.systemEvent.on(Events.RESTART_GAME.toString(), this.newGame, this);
        cc.systemEvent.on(Events.COMPLETE_LEVEL.toString(), this.newGame, this);
        cc.systemEvent.on(Events.NEXT_LEVEL.toString(), this.newGame, this);
        cc.systemEvent.on(Events.MAIN_MENU.toString(), this.newGame, this);
    }

    private windowResized(): void {
        this.settings.updateSettings();
        cc.systemEvent.emit(Events.WINDOW_RESIZED.toString(), this.settings);
    }

    private newGame() {

    }

    private loadScene(): void {
        cc.director.loadScene('Game', () => {
            console.log('Game Loaded');
            this.windowResized();
        });
    }

}
