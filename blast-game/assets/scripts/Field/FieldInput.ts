import InputManager from '../Plugins/Input/InputManager';
import { InputManagerData } from '../Plugins/Input/InputManagerData';
import InputSources from '../Plugins/Input/InputSources';
import InputTypes from '../Plugins/Input/InputTypes';
import Field from './Field';
import FieldUtils from './FieldUtils';

export default class FieldInput{
    public field: Field = null;

    private isEnable: boolean = false;

    constructor(field: Field){
        this.field = field;

        this.init();
    }

    public enable(): void {
        this.isEnable = true;
    }

    public disable(): void {
        this.isEnable = false;
    }

    public init(): void {
        InputManager.getInstance().on(InputTypes.Down, this.onInput, this);
    }

    private onInput(data: InputManagerData): void {
        if (!this.isEnable || data.touchSource !== InputSources.Field) return;
        const touchPos = data.eventTouch.getLocation();

        const mapPos = FieldUtils.instance.getPositionOnMap(touchPos);
        const tile  = this.field.fieldCreator.getTileByCoords(mapPos);


        console.log(touchPos, 'touchPos', mapPos);
        
    }
}
