import Tile from '../Tile/Tile';
import TilesCreator from '../Tile/TilesCreator';
import FieldCreator from './FieldCreator';
import FieldInput from './FieldInput';
import FieldState from './FieldStates/FieldState';
import FieldStateCreation from './FieldStates/FieldStateCreation';
import FieldUtils from './FieldUtils';

const { ccclass, property } = cc._decorator;

@ccclass()
export default class Field extends cc.Component {
    @property(TilesCreator) tilesCreator: TilesCreator = null;

    public fieldInput: FieldInput;
    public fieldCreator: FieldCreator;

    private state: FieldState;

    onLoad() {
        this.init();
    }

    start() {
    }

    public init(): void {
        new FieldUtils(this);
        this.fieldCreator = new FieldCreator(this);
        this.fieldInput = new FieldInput(this);

        this.setState(new FieldStateCreation(this));
    }

    public setState(state: FieldState): void {
        this.state = state;

        this.state.enterToState();
    }

    public tapToTile(tile: Tile): void {
        this.state.tapToTile(tile);
    }

    public async waitTimer(time: number): Promise<void> {
        return new Promise((res) => this.scheduleOnce(() => res(), time));
    }

    // update (dt) {}
}
