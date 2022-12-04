import { BoosterConfig } from './BoosterConfig';
import BoosterInput from './BoosterInput';
import BoosterRenderer from './BoosterRenderer';
import IBooster from './Interface/IBooster';
import IBoosterManager from './Interface/IBoosterManager';

const { ccclass, property } = cc._decorator;

@ccclass
export default class Booster extends cc.Component implements IBooster {
    @property(BoosterConfig) config: BoosterConfig = null;

    private manager: IBoosterManager = null;
    private renderer: BoosterRenderer = null;
    private input: BoosterInput = null;

    private counter: number;

    public init(manager: IBoosterManager, config: BoosterConfig): void {
        this.manager = manager;

        this.counter = config.startCount;
        this.config.startCount = config.startCount;
        this.config.type = config.type;

        this.renderer = this.node.getComponent(BoosterRenderer);
        this.renderer.init(config.icon, this.counter);

        this.input = new BoosterInput(this);
    }

    public getCount(): number {
        return this.counter;
    }

    public enable(): void {
        this.input.enable();
    }

    public disable(): void {
        this.input.disable();
    }

    public onTap(): void {
        this.manager.activateBooster(this.config.type);
    }
}
