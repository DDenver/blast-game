import LevelManager from '../../Level/LevelManager';
import InputManager from '../../Plugins/Input/InputManager';
import { InputManagerData } from '../../Plugins/Input/InputManagerData';
import InputSources from '../../Plugins/Input/InputSources';
import InputTypes from '../../Plugins/Input/InputTypes';
import PauseMenuRenderer from './PauseMenuRenderer';

const { ccclass, property } = cc._decorator;

@ccclass
export default class PauseMenu extends cc.Component {

    private levelManager: LevelManager = null;
    private renderer: PauseMenuRenderer = null;
    private isInputActive: boolean = false;

    onLoad() {
        this.renderer = this.node.getComponent(PauseMenuRenderer);

        InputManager.getInstance().on(InputTypes.Up, this.onUp, this);
    }

    public init(levelManager: LevelManager): void {
        this.levelManager = levelManager;
        this.isInputActive = true;
    }

    private async onUp(data: InputManagerData): Promise<void> {
        if (!this.isInputActive) return;
        this.isInputActive = false;

        switch (data.touchSource) {
            case InputSources.PauseButton:
                this.levelManager.pause();
                await this.renderer.showModal();
                break;
            case InputSources.ResumeButton:
                await this.renderer.hideModal();
                this.levelManager.pause();
                break;
            case InputSources.ExitButton:
                this.renderer.hideModal();
                this.levelManager.leave();
                break;
        }

        this.isInputActive = true;
    }
}
