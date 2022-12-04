import InputManager from '../Plugins/Input/InputManager';
import { InputManagerData } from '../Plugins/Input/InputManagerData';
import InputSources from '../Plugins/Input/InputSources';
import InputTypes from '../Plugins/Input/InputTypes';
import Booster from './Booster';
import IBoosterInput from './Interface/IBoosterInput';

export default class BoosterInput implements IBoosterInput {

    private booster: Booster = null;
    private isEnable: boolean = false;

    constructor(booster: Booster) {
        this.booster = booster;

        InputManager.getInstance().on(InputTypes.Down, this.onInput, this);
    }

    public enable(): void {
        this.isEnable = true;
    }

    public disable(): void {
        this.isEnable = false;
    }

    private onInput(data: InputManagerData): void {
        if (
            data.touchSource === InputSources.BoosterButton
            && this.isEnable
            && data.eventTouch.target instanceof cc.Node
            && this.booster.node === data.eventTouch.target
        ) {
            this.booster.onTap();
        }
    }
}
