import Events from '../../Enums/Events';
import InputManager from '../../Plugins/Input/InputManager';
import { InputManagerData } from '../../Plugins/Input/InputManagerData';
import InputSources from '../../Plugins/Input/InputSources';
import InputTypes from '../../Plugins/Input/InputTypes';
import { IResultData } from './IResultData';
import ResultMenuRenderer from './ResultMenuRenderer';

const { ccclass, property } = cc._decorator;

@ccclass
export default class ResultMenu extends cc.Component {
    private renderer: ResultMenuRenderer = null;
    private isInputActive: boolean = true;

    onLoad() {
        this.renderer = this.node.getComponent(ResultMenuRenderer);

        cc.systemEvent.on(Events.SHOW_RESULT.toString(), this.onShowResult, this);
        InputManager.getInstance().on(InputTypes.Up, this.onUp, this);
    }

    private onShowResult(data: IResultData): void {
        if (data.isNextLevel) {
            this.renderer.showWinModal(data.steps, data.score, data.level);
        } else {
            this.renderer.showFailModal(data.isFail, data.score);
        }
    }

    private async onUp(data: InputManagerData): Promise<void> {
        if (!this.isInputActive) return;
        this.isInputActive = false;

        switch (data.touchSource) {
            case InputSources.ResultHomeButton:
                cc.systemEvent.emit(Events.MAIN_MENU.toString());
                break;
            case InputSources.ResultNextLeveleButton:
                cc.systemEvent.emit(Events.NEXT_LEVEL.toString());
                break;
            case InputSources.ResultOkButton:
                cc.systemEvent.emit(Events.MAIN_MENU.toString());
                break;
        }

        this.isInputActive = true;
    }
}
