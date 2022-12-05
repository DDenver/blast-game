import Events from '../../Enums/Events';
import InputManager from '../../Plugins/Input/InputManager';
import { InputManagerData } from '../../Plugins/Input/InputManagerData';
import InputSources from '../../Plugins/Input/InputSources';
import InputTypes from '../../Plugins/Input/InputTypes';
import ScoreStorage from '../../ScoreStorage';
import MainMenuRenderer from './MainMenuRenderer';

const { ccclass, property } = cc._decorator;

@ccclass
export default class MainMenu extends cc.Component {
    private renderer: MainMenuRenderer = null;
    private isInputActive: boolean = true;

    onLoad() {
        this.renderer = this.node.getComponent(MainMenuRenderer);

        InputManager.getInstance().on(InputTypes.Up, this.onUp, this);
    }

    private async onUp(data: InputManagerData): Promise<void> {
        if (!this.isInputActive) return;
        this.isInputActive = false;

        switch (data.touchSource) {
            case InputSources.AchievementsButton:
                await this.showAchievements();
                break;
            case InputSources.NewGameButton:
                cc.systemEvent.emit(Events.NEW_GAME.toString());
                break;
            case InputSources.MenuOkButton:
                await this.renderer.showMenu();
                break;
        }

        this.isInputActive = true;
    }

    private async showAchievements(): Promise<void> {
        this.renderer.showAchievements(ScoreStorage.instance.get());
    }

}
