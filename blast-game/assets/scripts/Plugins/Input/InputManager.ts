import InputTypes from "./InputTypes";
import InputSources from "./InputSources";
import Events from "../../Enums/Events";


export default class InputManager extends cc.EventTarget {
    //#region properties

    public isLockedMultiTouch: boolean = true;

    private static instance: InputManager = null;

    private currentTouchID: any = null;

    // #endregion

    private constructor() {
        super();
        this.subscribeEvents();
    }

    //#region public methods

    public static getInstance(): InputManager {
        if (this.instance === null) {
            this.instance = new InputManager();
        }

        return this.instance;
    }

    public resetTouchID(): void {
        this.currentTouchID = null;
    }

    public on<T extends Function>(key: number | string, callback: T, target?: any, useCapture?: boolean): T {
        return super.on('' + key, callback, target, useCapture);
    }

    public off<T extends Function>(key: number | string, callback: T, target?: any, useCapture?: boolean): void {
        super.off('' + key, callback, target);
    }

    //#endregion


    //#region protected methods

    protected subscribeEvents(): void {
        cc.systemEvent.on(Events.INPUT.toString(), this.onInput, this);
    }

    //#endregion


    //#region event handlers

    private onInput(type: InputTypes, eventTouch: cc.Event.EventTouch, touchSource: InputSources): void {
        if (this.isLockedMultiTouch && this.currentTouchID !== null && this.currentTouchID !== eventTouch.getID()) return;

        if (type === InputTypes.Up) {
            this.currentTouchID = null;
        }

        if (type === InputTypes.Down) {
            this.currentTouchID = eventTouch.getID();
        }

        this.emit(InputTypes.None.toString(), { type, eventTouch, touchSource });
        this.emit(type.toString(), { type, eventTouch, touchSource });
    }

    //#endregion
}
